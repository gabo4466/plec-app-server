export interface CRUDRepository<T> {
    create(obj: T): Promise<any>;
    findByTerm(term: string): Promise<T>;
    getAll(offset: number, limit: number): Promise<T[]>;
    update(obj: T): Promise<T>;
    delete(id: string): Promise<any>;
}
