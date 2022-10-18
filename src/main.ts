import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if(process.env.mode === 'dev') {
    const config = new DocumentBuilder()
        .setTitle('API')
        .setDescription('All API breakpoints and methods')
        .setVersion('0.0.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/help', app, document);

    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    app.enableCors();
  }
  await app.listen(3000, () => console.log('Server has been started'));
}
bootstrap();
