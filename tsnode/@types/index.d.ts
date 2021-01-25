import { Request } from 'express';

export interface RequestCustom extends Request {
  daily_exercises: Array<number>;
  target: number;
  body: Record<string, unknown>;
}
