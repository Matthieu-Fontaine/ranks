import { Response } from "express";

class NotFoundResponse {
  entityName : any;
  id : number;
  statusCode: number;
  constructor(entityName : any, id : number, statusCode : number = 404) {
    this.entityName = entityName;
    this.id = id;
    this.statusCode = statusCode;
  }

  send(res : Response) {
    res.status(this.statusCode).json({ message: `${this.entityName} with id ${this.id} not found` });
  }
}

export default NotFoundResponse;