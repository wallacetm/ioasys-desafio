export interface DatabaseConfiguratorService {
  configure(): Promise<void>;
}