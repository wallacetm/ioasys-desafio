export interface SwaggerService<T> {
  generate(app: T): void;
}
