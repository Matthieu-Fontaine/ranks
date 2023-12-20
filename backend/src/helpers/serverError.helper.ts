import { Response } from 'express';

class ServerErrorResponse {
  message : any;
  constructor(message : any = 'Internal server error') {
    this.message = message;
  }

  send(res : Response) {
    res.status(500).json({ message: this.message });
  }
}

export default ServerErrorResponse;