import { INestApplication } from '@nestjs/common';
import { AuthTestManger } from './utils/auth.test.manger';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

/*describe('Auth Service test', () => {
  let app: INestApplication;
  let authTestManager: AuthTestManger;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AuthService)
      .useClass(AuthService)
      .compile();
  });
});*/
