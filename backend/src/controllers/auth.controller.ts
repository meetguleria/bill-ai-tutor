import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  static register = async (req: Request, res: Response) => {
    await AuthService.register(req.body.email, req.body.password);
    return res.sendStatus(201);
  };

  static login = async (req: Request, res: Response) => {
    const tokens = await AuthService.login(req.body.email, req.body.password);
    return tokens ? res.json(tokens) : res.status(401).json({ error: 'Invalid credentials' });
  };

  static refresh = async (req: Request, res: Response) => {
    const tokens = await AuthService.rotate(req.body.refresh);
    return tokens ? res.json(tokens) : res.status(401).json({ error: 'Invalid refresh token' });
  };

  static me = (req: Request, res: Response) => {
    // req.user populate by jwt middleware
    res.json({ id: (req.user as any).id });
  };
}