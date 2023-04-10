import { DatabaseServer as mssql } from "./mssql/msConfig";
import { DatabaseServer as postgresql } from "./postgressql/postgresConfig";
import { DatabaseServer as mongodb } from "./mongodb/mongodbConfig";

const DBs: any = {
  postgresql,
  mssql,
  mongodb
};
if (!DBs[process.env.DATABASE_PRODUCT!]) throw new Error("DB not selected");
export default DBs[process.env.DATABASE_PRODUCT!];
