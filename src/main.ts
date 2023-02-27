import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import * as firebase from 'firebase-admin';

async function bootstrap() {
    const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS);

    const params = {
        type: serviceAccount.type,
        projectId: serviceAccount.project_id,
        privateKeyId: serviceAccount.private_key_id,
        privateKey: serviceAccount.private_key,
        clientEmail: serviceAccount.client_email,
        clientId: serviceAccount.client_id,
        authUri: serviceAccount.auth_uri,
        tokenUri: serviceAccount.token_uri,
        authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
        clientC509CertUrl: serviceAccount.client_x509_cert_url,
    };

    firebase.initializeApp({
        credential: firebase.credential.cert(params),
    });

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
