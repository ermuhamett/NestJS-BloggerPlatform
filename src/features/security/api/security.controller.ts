import {ApiTags} from "@nestjs/swagger";
import {Controller, Delete, Get} from "@nestjs/common";
import {SecurityService} from "../application/security.service";


@ApiTags('Security')
@Controller('security')
export class SecurityController{
    constructor(private readonly securityService:SecurityService,
                private readonly securityQueryRepository:SecurityQueryRepository) {}

    @Get('devices')
    async getDevices(){}

    @Delete('devices')
    async terminateAllSessions(){}

    @Delete('devices/:deviceId')
    async terminateSessionById(){}
}