import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Session} from "../domain/security.entity";
import {Model} from "mongoose";


@Injectable()
export class SecurityQueryRepository{
    constructor(@InjectModel(Session.name) private sessionModel:Model<Session> ) {}
}