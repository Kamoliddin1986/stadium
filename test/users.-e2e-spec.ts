import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module'
import cookieParser from 'cookie-parser';


describe('UserController (e2e)', () => {
  let app: INestApplication;
  let token: String;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    app.setGlobalPrefix('api');
    await app.init();
    
    const response = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'Salimoboy3@mail.ru',
          password: 'Uzbek!$t0n',
        })
    token = response.body.tokens.access_token
    console.log(token);

       
  })

  it('/users (GET) --> 200 OK', () => {
    return request(app.getHttpServer())
    .get('/api/users/all')
    .set('Authorization', `Bearer ${token}`)
    .expect('Content-Type', /json/)
    .expect(200)
  })

  afterAll(async () => {
    await app.close();
    });


 
});
