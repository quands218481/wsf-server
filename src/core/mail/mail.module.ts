import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
// import { mailerConfig } from './config/mailer.config';
import { MailService } from './service/mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { environments } from 'src/environments/environments';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: environments.mail_host,
        secure: false,
        auth: {
          user: environments.email,
          pass: environments.email_password,
        },
      },
      defaults: {
        from: `"DinoStep" ${environments.email}`,
      },
      template: {
        dir: join(__dirname, 'template'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
