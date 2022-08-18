export interface Task<T> {
    execute(data: any): Promise<T>
}

export interface Api {
    
}