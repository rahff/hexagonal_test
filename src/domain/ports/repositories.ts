export interface Repository<T> {
    create(data: T): Promise<T>;
    findById(id: string): Promise<T | null>;
    deleteOne(id: string): Promise<T>;
    updateOne(id: string, update: Partial<T>): Promise<T>
}