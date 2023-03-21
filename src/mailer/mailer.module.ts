import { Module } from '@nestjs/common';
// import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';
import {join} from'path'
import {HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { MailerModule } from '@nestjs-modules/mailer';
import { MailersService } from './mailer.service';

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async (config: ConfigService) => ({
                transport: {
                    host: config.get<string>("MAILER_HOST"),
                    secure: false,
                    auth: {
                        user: config.get<string>("MAILDEV_USER"),
                        pass: config.get<string>("MAILDEV_PASS")
                    },
                },
                default: {
                    from: `"Stadium" <${config.get('MAILER_HOST')}>`,
                },
                tamplate: {
                    dir: join(__dirname,'tamplate'),
                    adapter: new HandlebarsAdapter(),
                    template: 'confirmation',
                    options: {
                        strict: true
                    },

                },
            }),
            inject: [ConfigService]
        }),
    ],
    providers: [MailersService],
    exports: [MailersService]
})
export class MailersModule {}
