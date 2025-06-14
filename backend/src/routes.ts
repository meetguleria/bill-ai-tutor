import { Router } from "express";
import { HealthController } from './controllers/health.controller';

export const router = Router();

// Root endpoint for api
router.get('/', (req, res) => {
  res.json({ message: "API is running" });
});

// Simple health check endpoint
router.get('/health', HealthController.check);