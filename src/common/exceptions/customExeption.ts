import { HttpException,HttpExceptionOptions } from "@nestjs/common";
import { errorResponse } from "../interfaces/common.interfaces";

export class CustomException extends HttpException {

    constructor(
        response: string | Record<string, any>, // Add parameters required by the superclass
        status: number,
        options: HttpExceptionOptions,
      ) {
        super(response,status,options);
        this.initMessage();
        this.initName();
        this.initCause();
      }

    public override  getResponse(): errorResponse {
        return super.getResponse() as errorResponse;
    }

}