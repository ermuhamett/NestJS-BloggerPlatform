import { SessionDocument } from '../../../domain/security.entity';

export class SecurityOutputDto {
  constructor(
    public ip: string,
    public title: string,
    public lastActiveDate: string,
    public deviceId: string,
  ) {}
}

export class SecurityMapper {
  public static toView(session: SessionDocument): SecurityOutputDto {
    return {
      ip: session.ip,
      title: session.deviceName,
      lastActiveDate: new Date(session.createdAt).toISOString(),
      deviceId: session.deviceId,
    };
  }
}
