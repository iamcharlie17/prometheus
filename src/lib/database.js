import oracledb from "oracledb";

// Optional: initOracleClient() for Windows/Linux if Instant Client is not in PATH
// oracledb.initOracleClient({ libDir: "C:\\oracle\\instantclient_21_3" });

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;


const dbConfig = {
  user: process.env.ORACLE_USER,
  password: process.env.ORACLE_PASSWORD,
  connectString: `${process.env.ORACLE_HOST}:${process.env.ORACLE_PORT}/${process.env.ORACLE_DATABASE}`,
};

export async function executeQuery(query, binds = [], options = {}) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(query, binds, {
      autoCommit: true,
      ...options,
    });
    return result;
  } catch (err) {
    console.error("Database error:", err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (closeErr) {
        console.error("Error closing connection:", closeErr);
      }
    }
  }
}
