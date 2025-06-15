import { Router } from "express";
import { HealthController } from './controllers/health.controller';
import { validateDto } from './middlewares/validate.dto';
import { loginLimiter } from './middlewares/rate-limit';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthController } from './controllers/auth.controller';
import { jwtGuard } from './middlewares/jwt.guard';

export const router = Router();

// Root endpoint for api
router.get('/', (req, res) => {
  res.json({ message: "API is running" });
});

// Simple health check endpoint
router.get('/health', HealthController.check);

// Authentication endpoints
router.post(
  '/auth/register',
  validateDto(RegisterDto),
  AuthController.register
);

router.post(
  '/auth/login',
  loginLimiter,
  validateDto(LoginDto),
  AuthController.login
);

router.post(
  '/auth/refresh',
  AuthController.refresh
);

router.get(
  '/auth/me',
  jwtGuard,
  AuthController.me
);