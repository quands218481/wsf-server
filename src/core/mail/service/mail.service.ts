import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '../../../features/user/schema/user.schema';
import { environments } from 'src/environments/environments';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, code: string, expiration: Date) {
    const url = environments.frontEndUrl || 'https://google.com.vn';
      try {
        await this.mailerService.sendMail({
          to: user.email,
          // from: '"Support Team" <support@example.com>', // override default from
          subject: 'Welcome to DinoStep',
          template: './recover', // `.hbs` extension is appended automatically
          context: { // ✏️ filling curly brackets with content
            name: user.username,
            url,
            code,
            expiration
          },
        });
        return 'Successful!!';
      } catch (e) {
        throw new InternalServerErrorException(
          `An error occurred sending email: ${e.message}`,
        );
      }
    }
  }