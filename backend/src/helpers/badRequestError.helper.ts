import { Response } from "express";

class BadRequestResponse {
  message: any;
  statusCode: number;
  constructor(message: any = 'Missing parameters', statusCode: number = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }

  send(res: Response) {
    res.status(this.statusCode).json({ message: this.message });
  }
}

export default BadRequestResponse;

