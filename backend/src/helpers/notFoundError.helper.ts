import { Response } from "express";

class NotFoundResponse {
  entityName : any;
  id : number;
  constructor(entityName : any, id : number) {
    this.entityName = entityName;
    this.id = id;
  }

  send(res : Response) {
    res.status(404).json({ message: `${this.entityName} with id ${this.id} not found` });
  }
}

export default NotFoundResponse;