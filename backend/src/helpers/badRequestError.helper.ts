import { Response } from "express";

class BadRequestResponse {
  message : any;
  constructor(message : any = 'Missing parameters') {
    this.message = message;
  }

  send(res : Response) {
    res.status(400).json({ message: this.message });
  }
}

export default BadRequestResponse;

