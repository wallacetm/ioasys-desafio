export interface ConfigService {
  set<T>(key: string, value: T): void;
  get<T>(key: string, defaultValue?: T): T;
  mapObject<T>(object: T, prefix?: string): void;
}