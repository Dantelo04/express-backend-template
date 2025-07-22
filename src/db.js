import pg from "pg";
import { config } from "./config.js";

const pool = new pg.Pool({
    connectionString: config.dbUrl,
});

export default pool;