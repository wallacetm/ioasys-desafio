export const TYPES = {
  CONTAINER_JWT_AUTH_SERVICE: Symbol('JWTAuthService'),
  CONTAINER_BCRYPT_CRYPTO_SERVICE: Symbol('BCryptCryptoService'),
  CONTAINER_REQUIRED_AUTH_MIDDLEWARE: Symbol('RequiredAuthMiddleware'),
  CONTAINER_OPTIONAL_AUTH_MIDDLEWARE: Symbol('OptionalAuthMiddleware'),
  SCOPED_USER_PRINCIPAL: Symbol('UserPrincipal'),
  CONTAINER_MAP_CONFIG_SERVICE: Symbol('MapConfigService'),
  CONTAINER_DATABASE_CONNECTION: Symbol('DatabaseConnection'),
  CONTAINER_DEFAULT_DATABASE_CONFIGURATOR_SERVICE: Symbol('DefaultDatabaseConfiguratorService'),
  CONTAINER_CONSOLE_LOGGER_SERVICE: Symbol('ConsoleLoggerService'),
  CONTAINER_EXPRESS_SWAGGER_SERVICE: Symbol('ExpressSwaggerService'),
  CONTAINER_DEFAULT_USER_SERVICE: Symbol('DefaultUserService'),
  CONTAINER_DEFAULT_ADMIN_SERVICE: Symbol('DefaultAdminService')
}