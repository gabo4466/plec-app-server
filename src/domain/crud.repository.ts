export interface CRUDRepository<T> {
    create(obj: T): Promise<T>;
    findOneByTerm(term: string): Promise<T>;
    search(term: string, offset: number, limit: number): Promise<T[]>;
    update(obj: T): Promise<T>;
    delete(id: string): Promise<any>;
}
