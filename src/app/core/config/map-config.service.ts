import { injectable } from 'inversify';
import { ConfigService } from './interfaces';
@injectable()
export class MapConfigService implements ConfigService {
  private readonly map: Map<string, any> = new Map<string, any>();
  set<T>(key: string, value: T): void {
    this.map.set(key, value);
  }
  get<T>(key: string, defaultValue: T = null): T {
    const value = this.map.get(key);
    if (value === null || value === undefined) {
      return defaultValue;
    }
    return value;
  }
  mapObject<T>(object: T, prefix?: string): void {
    for (const key in object) {
      const keyCamelCase: string = key
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, '');

      if (object[key] !== null && typeof object[key] === 'object' && !Array.isArray(object[key])) {
        this.mapObject(object[key], key);
      } else {
        if (prefix) {
          const prefixCamelCase: string = prefix
            .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
              return index === 0 ? word.toLowerCase() : word.toUpperCase();
            })
            .replace(/\s+/g, '');

          this.set(`${prefixCamelCase}:${keyCamelCase}`, object[key]);
        } else {
          this.set(keyCamelCase, object[key]);
        }
      }
    }
  }
}