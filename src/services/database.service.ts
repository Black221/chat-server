import mongoose from "mongoose";


export default class DatabaseService {

    private static instance: DatabaseService;

    private constructor() { }

    public static getInstance(): DatabaseService {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }

    public async connect(db: string): Promise<void> {
        // Connect to database
        let uri = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI + "/" + db : "mongodb://127.0.0.1:27017/" + db;
        mongoose.connect(uri).then(() => {
            console.log("Connected to database");
        }, err => {
            console.log("Error connecting to database: " + err);
        });
    }

    public async disconnect(): Promise<void> {
        // Disconnect from database
        mongoose.disconnect();
    }

    public async drop(): Promise<void> {
        // Drop database
        mongoose.connection.db.dropDatabase();
    }

    public async dropCollection(collection: string): Promise<void> {
        // Drop collection
        mongoose.connection.db.dropCollection(collection);
    }
}