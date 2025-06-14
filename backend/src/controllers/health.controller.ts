import { Request, Response } from 'express';
import { HealthService } from '../services/health.service';

export class HealthController {
  static async check(req: Request, res: Response) {
    const status = await HealthService.check();
    res.status(200).json({ status });
  }
}