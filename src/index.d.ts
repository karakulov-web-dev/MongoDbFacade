import mongodb from "mongodb";
interface IMongoDbBuilder {
    bdName: string;
    user: string;
    password: string;
    authMechanism: string;
    ip: string;
    port: string;
}
export declare class MongoDbBuilder {
    db: mongodb.Db | Promise<mongodb.Db>;
    private client;
    private bdName;
    constructor({ bdName, user, password, authMechanism, ip, port }: IMongoDbBuilder);
    private build;
}
export declare class MongoDbFacade {
    protected db: mongodb.Db | Promise<mongodb.Db>;
    protected collectionName: string;
    collection: mongodb.Collection | Promise<mongodb.Collection>;
    constructor(db: mongodb.Db | Promise<mongodb.Db>, collectionName: string);
    protected build(): Promise<mongodb.Collection<any>>;
    get(filter: object): Promise<any[]>;
    set(objArr: object[]): Promise<mongodb.InsertWriteOpResult>;
    update(filter: object, update: object): Promise<mongodb.UpdateWriteOpResult>;
    rm(filter: object): Promise<mongodb.DeleteWriteOpResultObject>;
}
export {};
