import { Response } from 'express';

class SuccessResponse {
  data : any;
  statusCode : number;
  constructor(data : any = null, statusCode : number = 200) {
    this.data = data;
    this.statusCode = statusCode;
  }

  send(res : Response) {
    res.status(this.statusCode).json(this.data);
  }
}

export default SuccessResponse;