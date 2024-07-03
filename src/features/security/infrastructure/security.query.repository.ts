import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Session } from '../domain/security.entity';
import { Model } from 'mongoose';
import { SecurityMapper } from '../api/models/output/security.output.model';

@Injectable()
export class SecurityQueryRepository {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<Session>,
  ) {}

  async getDevices(userId: string) {
    const authSession = await this.sessionModel.findOne({ userId: userId });
    if (!authSession) {
      throw new NotFoundException('Session not found');
    }
    return SecurityMapper.toView(authSession);
  }
}
