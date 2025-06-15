import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

passport.use(new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET!,
  },
  (payload, done) => done(null, { id: payload.sub })
));

export const jwtGuard = passport.authenticate('jwt', { session: false });