import { Connection, Request } from "tedious";
import DatabaseInterface from "../../../interfaces/database";

export class DatabaseServer extends DatabaseInterface {
  private static _instance: DatabaseServer;
  static _conn: Connection;
  static _connected: boolean;

  private constructor() {
    super();
    const config: any = {
      server: process.env.MSSQL_SERVER,
      authentication: {
        type: process.env.MSSQL_AUTH_TYPE,
        options: {
          userName: process.env.MSSQL_USER,
          password: process.env.MSSQL_PASS
        }
      },
      options: {
        port: process.env.MSSQL_PORT,
        database: process.env.MSSQL_DB,
        trustServerCertificate: true
        // rowCollectionOnRequestCompletion: true
      }
    };

    const connection = new Connection(config);
    connection.connect((error: any) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Connected to DB");
        DatabaseServer._connected = true;
      }
    });

    DatabaseServer._conn = connection;
  }

  static getInstance(): any {
    if (this._instance) {
      return this._instance;
    }

    this._instance = new DatabaseServer();
    return this._instance;
  }

  static runQuery(query: string): any {
    if (DatabaseServer._connected) {
      const request = new Request(query, (error: any) => {
        if (error) {
          console.log(error);
        }
      });

      return new Promise((resolve, reject) => {
        const result: any = [];

        request.on("row", (columns) => {
          const entry: any = {};
          columns.forEach((column) => {
            entry[column.metadata.colName] = column.value;
          });
          result.push(entry);
        });

        request.on("error", (error) => reject(error)); // some error happened, reject the promise
        request.on("requestCompleted", () => resolve(result)); // resolve the promise with the result rows.

        DatabaseServer._conn.execSql(request);
      });
    } else return "DB not connected";
  }
}
export default DatabaseServer;
