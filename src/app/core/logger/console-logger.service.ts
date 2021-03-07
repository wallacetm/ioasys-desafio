import { inject, injectable } from 'inversify';
import * as winston from 'winston';
import { CONTAINER_MAP_CONFIG_SERVICE } from '../config/container';
import { ConfigService } from '../config/interfaces';
import { LoggerService } from './interfaces';
import { CONFIG_APPLICATION_NAME, CONFIG_SERVER_NODE_ENV } from '../../../constants';

const { combine, label, timestamp, printf } = winston.format;

@injectable()
export class ConsoleLoggerService implements LoggerService {
  private readonly logger: winston.Logger;
  constructor(@inject(CONTAINER_MAP_CONFIG_SERVICE) config: ConfigService) {
    this.logger = winston.createLogger({
      format: combine(
        label({ label: config.get<string>(CONFIG_APPLICATION_NAME) }),
        timestamp(),
        printf(({ level, message, label, timestamp }) => {
          return `${timestamp} [${label}] ${level}: ${message}`;
        }),
      ),
      transports: [new winston.transports.Console({ level: config.get<string>(CONFIG_SERVER_NODE_ENV) === 'prod' ? 'info' : 'debug' })],
    })
  }

  public stream(): { write: (msg: string) => void } {
    return {
      write: (msg: string): void => {
        this.logger.info(msg.replace('\n', ''));
      },
    };
  }

  public info(message: string, ...meta: any[]): void {
    this.logger.info(message, ...meta);
  }

  public error(message: string, ...meta: any[]): void {
    this.logger.error(message, ...meta);
  }

  public warn(message: string, ...meta: any[]): void {
    this.logger.warn(message, ...meta);
  }

  public debug(message: string, ...meta: any[]): void {
    this.logger.debug(message, ...meta);
  }
}
