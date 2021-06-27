export interface IRepository<T> {
    findAll(): Promise<T[]>;
    findOne(): Promise<T[]>;
    updateOne(): Promise<T[]>;
  }