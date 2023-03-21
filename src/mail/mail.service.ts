import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../users/models/user.model';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService){}

    async sendUserConfirmation(user: User): Promise<void> {
        const url = `${process.env.API_HOST}/api/users/activate/${user.activation_link}`;
        await this.mailerService.sendMail({
            // console.log("SEND>>>>>>>>>>>>>>>>>>>>>>>>>>>"),
            to: user.email,
            subject: 'Welcom to Stadium APP, Confirm your mail',
            template: './confirmation',
            context: {
                name: user.first_name,
                url,
            }
        });
        
    }
}
