import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Admin } from '../admin/models/admin.model';

@Injectable()
export class MailersService {
    constructor(private mailersService: MailerService ){}

    async sendAdminConfirmation(admin: Admin): Promise<void> {
        const url = `${process.env.API_HOST}/api/admin/activate/${admin.activation_link}`;
        await this.mailersService.sendMail({
            to: admin.email,
            subject: "Welcom to Stadium app, confirm your email",
            template: './confirmation',
            context: {
                name: admin.username,
                url,
            }
        })
    }
}
