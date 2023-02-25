import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    console.log(JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS));
    // TODO: LOG IN TO FIREBASE ADMIN

    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );
    app.setGlobalPrefix('api');
    await app.listen(process.env.PORT);
}
bootstrap();
