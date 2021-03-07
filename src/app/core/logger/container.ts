import { ContainerModule } from 'inversify';
import { LoggerService } from './interfaces';
import { ConsoleLoggerService } from './console-logger.service';

const CONTAINER_CONSOLE_LOGGER_SERVICE = Symbol('ConsoleLoggerService');

const LoggerContainerModule: ContainerModule = new ContainerModule((bind) => {
  bind<LoggerService>(CONTAINER_CONSOLE_LOGGER_SERVICE).to(ConsoleLoggerService).inSingletonScope();
});

export { LoggerContainerModule, CONTAINER_CONSOLE_LOGGER_SERVICE };