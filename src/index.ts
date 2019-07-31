import mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;

interface IMongoDbBuilder {
  bdName: string;
  user: string;
  password: string;
  authMechanism: string;
  ip: string;
  port: string;
}

export class MongoDbBuilder {
  public db: mongodb.Db | Promise<mongodb.Db>;
  private client: mongodb.MongoClient;
  private bdName: string;
  constructor({
    bdName,
    user,
    password,
    authMechanism,
    ip,
    port
  }: IMongoDbBuilder) {
    this.bdName = encodeURIComponent(bdName);
    user = encodeURIComponent(user);
    password = encodeURIComponent(password);
    const url = `mongodb://${user}:${password}@${ip}:${port}/?authMechanism=${authMechanism}`;
    this.client = new MongoClient(url, { useNewUrlParser: true });
    this.db = this.build();
  }
  private build(): Promise<mongodb.Db> {
    return new Promise((resolve, reject) => {
      this.client.connect(err => {
        if (err) {
          reject("error connection db");
          return;
        }
        resolve(this.client.db(this.bdName));
      });
    });
  }
}

export class MongoDbFacade {
  public collection: mongodb.Collection | Promise<mongodb.Collection>;
  constructor(
    protected db: mongodb.Db | Promise<mongodb.Db>,
    protected collectionName: string
  ) {
    this.collection = this.build();
  }
  protected async build() {
    let db = await this.db;
    return db.collection(this.collectionName);
  }
  async get(filter: object) {
    let collection = await this.collection;
    return await collection.find(filter).toArray();
  }
  async set(objArr: object[]) {
    let collection = await this.collection;
    return await collection.insertMany(objArr);
  }
  async update(filter: object, update: object) {
    let collection = await this.collection;
    return await collection.updateMany(filter, update);
  }
  async rm(filter: object) {
    let collection = await this.collection;
    return await collection.deleteMany(filter);
  }
}
