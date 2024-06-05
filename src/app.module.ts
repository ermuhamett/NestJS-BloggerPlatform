import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { appSettings } from './settings/app-settings';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import {BlogsModule} from "./features/modules/blogs.module";
import {TestingModule} from "./features/testing/api/testing.module";
import {UserModule} from "./features/users/api/user.module";


@Module({
  // Регистрация модулей
  imports: [
    MongooseModule.forRoot(appSettings.api.MONGO_CONNECTION_URI),
    BlogsModule,
    TestingModule,
    UserModule
   // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  // Регистрация провайдеров
  providers: [
    //...usersProviders,
    /* {
            provide: UsersService,
            useClass: UsersService,
        },*/
    /*{
            provide: UsersService,
            useValue: {method: () => {}},

        },*/
    // Регистрация с помощью useFactory (необходимы зависимости из ioc, подбор провайдера, ...)
    /* {
            provide: UsersService,
            useFactory: (repo: UserRepository) => {
                return new UsersService(repo);
            },
            inject: [UserRepository]
        }*/
  ],
  // Регистрация контроллеров
  //controllers: [UserController],
})
export class AppModule implements NestModule {
  // https://docs.nestjs.com/middleware#applying-middleware
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
