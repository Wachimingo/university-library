import pgk from "pg";
const { Pool } = pgk;
import DatabaseInterface from "../../../interfaces/database";

export class DatabaseServer extends DatabaseInterface {
  private static _instance: DatabaseServer;
  static _conn: any;
  static _connected: boolean;

  private constructor() {
    super();
    const client = new Pool({
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRESS_PASS,
      port: +process.env.POSTGRESS_PORT!
    });
    client
      .connect()
      .then((): void => {
        console.log("connected to db");
        DatabaseServer._conn = client;
        DatabaseServer._connected = true;
      })
      .catch((err: any) => console.log(err));
  }
  static getInstance(): DatabaseServer {
    if (this._instance) {
      return this._instance;
    }

    this._instance = new DatabaseServer();
    return this._instance;
  }
  static async runQuery(query: string) {
    if (DatabaseServer._connected) {
      const result = await DatabaseServer._conn.query(query);
      return result.rows;
    }
    return "DB is not connected";
  }
}

export default DatabaseServer;
