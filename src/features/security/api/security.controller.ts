import {ApiTags} from "@nestjs/swagger";
import {Controller, Delete, Get} from "@nestjs/common";


@ApiTags('Security')
@Controller('security')
export class SecurityController{
    constructor() {}

    @Get('devices')
    async getDevices(){}

    @Delete('devices')
    async terminateAllSessions(){}

    @Delete('devices/:deviceId')
    async terminateSessionById(){}
}