export interface CRUDRepository<T, G> {
    create(dataBaseDto: G): Promise<any>;
    findByTerm(term: string): Promise<T>;
    getAll(offset: number, limit: number): Promise<T[]>;
    update(dataBaseDto: G): Promise<T>;
    delete(id: string): Promise<any>;
}
