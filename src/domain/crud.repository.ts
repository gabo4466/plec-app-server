export interface CRUDRepository<T> {
    create(obj: T): any;
    findByTerm(term: string): T;
    getAll(offset: number, limit: number): T[];
    update(obj: T): T;
    delete(id: string): any;
}
