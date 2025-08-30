import oracledb from "oracledb";

// On Windows, you might need to specify the path to the Instant Client
// if it's not in your system's PATH.
// try {
//   oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient_21_3' });
// } catch (err) {
//   console.error('Whoops!');
//   console.error(err);
//   process.exit(1);
// }

// Tell node-oracledb to return rows as JavaScript objects.
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const dbConfig = {
  user: process.env.ORACLE_USER,
  password: process.env.ORACLE_PASSWORD,
  // The connectString is crucial for Oracle
  connectString: `${process.env.ORACLE_HOST}:${process.env.ORACLE_PORT}/${process.env.ORACLE_DATABASE}`,
};

export async function executeQuery(query, binds = []) {
  let connection;
  try {
    // Get a connection from the default connection pool
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(query, binds, { autoCommit: true });
    return result;
  } catch (err) {
    console.error(err);
    // You can add more robust error handling here
    throw err;
  } finally {
    if (connection) {
      try {
        // Always close the connection when done
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}
