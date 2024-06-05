import {Injectable} from "@nestjs/common";
import { JwtService as NestJwtService, JwtSignOptions } from '@nestjs/jwt';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class JwtService{
    private readonly secretKey: string;
    private readonly jwtExpiry: string;
    private readonly refreshTokenExpiry: string;

    constructor(private readonly configService:ConfigService,
                private readonly jwtService:NestJwtService) {
        this.secretKey = this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET');
        this.jwtExpiry = this.configService.get<string>('JWT_EXPIRY');
        this.refreshTokenExpiry = this.configService.get<string>('REFRESH_TOKEN_EXPIRY');
    }

    async createJwtToken(userId:string){
        const payload={userId};
        const options:JwtSignOptions={expiresIn:this.jwtExpiry};
        return this.jwtService.signAsync(payload, {secret:this.secretKey, ...options})
    }
    async createRefreshToken(userId: string): Promise<string> {//В будущем добавится deviceId для сессии
        const payload = { userId };
        const options: JwtSignOptions = { expiresIn: this.refreshTokenExpiry };
        return this.jwtService.signAsync(payload, { secret: this.secretKey, ...options });
    }
    async createPairToken(userId: string): Promise<{ accessToken: string; refreshToken: string }> {//Сюда тоже добавится deviceId для сессии
        const accessToken = await this.createJwtToken(userId);
        const refreshToken = await this.createRefreshToken(userId);
        return { accessToken, refreshToken };
    }
    async decodeToken(token:string){
        try {
          return this.jwtService.decode(token);
        }catch (e) {
            console.error({ decodeToken: 'Cant decode token', e });
            return null;
        }
    }

    async verifyToken(token:string){
        try {
            return await this.jwtService.verifyAsync(token, { secret: this.secretKey });
        } catch (e) {
            console.error('Token verify error:', e);
            return null;
        }
    }
}