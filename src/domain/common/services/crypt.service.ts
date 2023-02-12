export interface CryptService {
    encrypt(term: string): string;
    compare(term: string, encrypted: string): boolean;
}
