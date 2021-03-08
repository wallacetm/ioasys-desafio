import { ContainerModule } from 'inversify';
import { LoggerService } from './interfaces';
import { ConsoleLoggerService } from './console-logger.service';
import { TYPES } from '../containers/types';



const LoggerContainerModule: ContainerModule = new ContainerModule((bind) => {
  bind<LoggerService>(TYPES.CONTAINER_CONSOLE_LOGGER_SERVICE).to(ConsoleLoggerService).inSingletonScope();
});

export { LoggerContainerModule };