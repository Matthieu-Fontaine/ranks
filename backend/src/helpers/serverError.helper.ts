import { Response } from 'express';

class ServerErrorResponse {
  message : any;
  statusCode : number;
  constructor(message : any = 'Internal server error', statusCode : number = 500) {
    this.message = message;
    this.statusCode = statusCode;
  }

  send(res : Response) {
    res.status(this.statusCode).json({ message: this.message });
  }
}

export default ServerErrorResponse;