export interface CRUDRepository<T> {
    create(obj: T): Promise<T>;
    findOneByTerm(term: string): Promise<T>;
    getAll(offset: number, limit: number): Promise<T[]>;
    search(term: string): Promise<T>;
    update(obj: T): Promise<T>;
    delete(id: string): Promise<any>;
}
