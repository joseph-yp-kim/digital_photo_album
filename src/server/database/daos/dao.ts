import { Model as MongooseModel, Types, QueryOptions } from 'mongoose';

export type ID = string;
export type ObjectId = Types.ObjectId | ID;

export type DaoOptions<T> = {
  virtuals?: string[];
};

export type Query = {
  [key: string]: any;
};

export type Update<T> = Partial<T> & {
  [key: string]: any;
};

type QueryLeanOptions = {
  virtuals: string[];
};

export class Dao<Model extends object> {
  protected leanOptions: QueryLeanOptions;

  constructor(protected model: MongooseModel<any>, options?: DaoOptions<Model>) {
    const virtuals = ['id', ...(options?.virtuals || [])];
    this.leanOptions = { virtuals };
  }

  public async getById(id: ID): Promise<Model> {
    if (!id) {
      throw new Error(`Unable to query by falsy id ${id}`);
    }

    return this.model
      .findById(id)
      .lean(this.leanOptions as any)
      .exec() as Model;
  }

  public async getOne(query: Query): Promise<Model> {
    return this.model
      .findOne(query)
      .lean(this.leanOptions as any)
      .exec() as Model;
  }

  public async create(input: Partial<Model>): Promise<Model> {
    const instance = await this.model.create({
      ...this.getNewInstance(),
      ...input,
    });
    return instance.toObject(this.leanOptions) as Model;
  }

  public async insertMany(input: Model[]): Promise<void> {
    await this.model.insertMany(input);
  }

  public async deleteById(id: ID): Promise<Model> {
    return this.model
      .findByIdAndRemove(id)
      .lean(this.leanOptions as any)
      .exec() as Model;
  }

  public getNewInstance(fromInstance?: Model): Model {
    return new this.model(this.cleanInstance(fromInstance || {})).toObject() as Model;
  }

  public async updateById(id: ID, update: Update<Model>) {
    return this.model
      .findByIdAndUpdate(id, update, { new: true })
      .lean(this.leanOptions as any)
      .exec() as Model;
  }

  public async updateManyByIds(ids: ID[], update: Update<Model>) {
    return this.model
      .updateMany({ _id: { $in: ids } }, update)
      .lean(this.leanOptions as any)
      .exec() as Model;
  }

  public async updateOne(
    query: Query,
    update: Update<Model>,
    options?: QueryOptions,
  ): Promise<Model> {
    return this.model
      .findOneAndUpdate(query, update, { new: true, ...options })
      .lean(this.leanOptions as any)
      .exec() as Model;
  }

  public async update(query: Query, update: Update<Model>, options?: QueryOptions) {
    return this.model
      .updateMany(query, update, options)
      .lean(this.leanOptions as any)
      .exec();
  }

  protected async delete(query: Query): Promise<void> {
    await this.model.remove(query).exec();
  }

  protected async existsWith(filter: Query): Promise<boolean> {
    return this.model.exists(filter);
  }

  protected async get(query: Query, opts: QueryOptions = {}): Promise<Model[]> {
    const operation = this.model.find(query);

    if (opts.limit) {
      operation.limit(opts.limit);
    }

    return operation.lean(this.leanOptions as any).exec() as Promise<Model[]>;
  }

  protected async count(query: Query): Promise<number> {
    return this.model.count(query).exec();
  }

  protected cleanInstance<T extends { [key: string]: any }, K = keyof T>(
    modelInstance: T,
    extraProps?: K[],
  ): T {
    const instancePropertiesToRemove = [
      '_id',
      '__v',
      '__t',
      'id',
      'createdAt',
      'updatedAt',
      ...(extraProps || []),
    ];

    let cleanedInstance = { ...modelInstance };
    for (const prop of instancePropertiesToRemove) {
      delete cleanedInstance[prop as string];
    }

    return cleanedInstance;
  }
}
