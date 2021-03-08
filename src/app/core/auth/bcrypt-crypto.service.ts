import { CryptoService } from './interfaces';
import { hash, compare } from 'bcrypt';
import { injectable } from 'inversify';

@injectable()
export class BCryptCryptoService implements CryptoService {
  encrypt(value: string): Promise<string> {
    return hash(value, 10);
  }
  compare(hash: string, value: string): Promise<boolean> {
    return compare(hash, value);
  }
}