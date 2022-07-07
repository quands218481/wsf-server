import { config } from 'dotenv';

config();

const env = process.env;

export const environments = {
  port: Number(env.PORT || 3000),
  mongoUri: env.MONGO_URI,
  // mongoUri: 'mongodb://localhost/Server',
  proxyEnabled: env.PROXY_ENABLED === 'true',
  frontEndUrl: env.FRONTEND_URL,
  accessTokenSecret: env.ACCESS_TOKEN_SECRET,
  accessTokenExpiration: env.ACCESS_TOKEN_EXPIRATION,
  refreshTokenSecret: env.REFRESH_TOKEN_SECRET,
  refreshTokenExpiration: env.REFRESH_TOKEN_EXPIRATION,
  recoverCodeExpiration: Number(env.RECOVER_CODE_EXPIRATION),
  redis: {
    enabled: env.REDIS_ENABLED === 'true',
    host: env.REDIS_HOST,
    port: Number(env.REDIS_PORT),
  },
  mail_host: env.MAIL_HOST,
  email: env.EMAIL,
  email_password: env.EMAIL_PASSWORD,
  provider: env.PROVIDER,
  wsf_contract: env.WSF_CONTRACT,
  private_key: env.PRIVATE_KEY,
  encrypt_password: env.ENCRYPT_PASSWORD,
  vapid: {
    publicKey: env.VAPID_PUBLIC_KEY,
    privateKey: env.VAPID_PRIVATE_KEY,
    subject: env.VAPID_SUBJECT,
  },
};
