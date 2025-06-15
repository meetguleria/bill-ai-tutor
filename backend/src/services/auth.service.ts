import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { redis } from '../config/redis';
import { AppDataSource } from '../config/ormconfig';
import { User } from '../entities/User';

const userRepo = AppDataSource.getRepository(User);
const ACCESS_TTL = '15m';
const REFRESH_TTL = 60 * 60 * 24 * 7;

export class AuthService {
  static async register(email: string, password: string) {
    const user = userRepo.create({ email, passwordHash: password});
    return userRepo.save(user);
  }

  static async login(email: string, password: string) {
    const user = await userRepo.findOne({ where: { email }, select: ['id', 'passwordHash'] });
    if (!user || !(await bcrypt.compare(password, user.passwordHash)))
      return null;
    return this.issueTokens(user.id);
  }

  private static async issueTokens(userId: number) {
    const access = jwt.sign({ sub: userId }, process.env.JWT_SECRET!, { expiresIn: ACCESS_TTL });
    const refresh = crypto.randomUUID();
    await redis.set(refresh, String(userId), 'EX', REFRESH_TTL);
    return { access, refresh };
  }

  static async rotate(refreshToken: string) {
    const userId = await redis.get(refreshToken);
    if (!userId) return null;
    await redis.del(refreshToken);
    return this.issueTokens(Number(userId));
  }
}