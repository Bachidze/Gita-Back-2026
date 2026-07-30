import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

export class AuthMidlleware implements NestMiddleware{
    use(req:Request, res: Response, next: NextFunction) {
        if(!req.headers["password"] || req.headers["password"] !== "12345") throw new BadRequestException()
        next()
    }
}