const fs = require("fs/promises");
const path = require("path");
const oracledb = require("oracledb");

// Load environment variables from .env.local
require("dotenv").config({ path: path.resolve(process.cwd(), ".env.local") });

console.log(process.env.ORACLE_USER);

// Configure Oracle DB connection
const dbConfig = {
  user: process.env.ORACLE_USER,
  password: process.env.ORACLE_PASSWORD,
  connectString: `${process.env.ORACLE_HOST}:${process.env.ORACLE_PORT}/${process.env.ORACLE_DATABASE}`,
};

async function run() {
  let connection;
  try {
    console.log("Connecting to the Oracle database...");
    connection = await oracledb.getConnection(dbConfig);
    console.log("Successfully connected.");

    const sqlDir = path.dirname(__filename); // Use path.dirname(__filename) for robustness
    const files = await fs.readdir(sqlDir);

    // Filter for .sql files and sort them numerically
    const sqlFiles = files.filter((file) => file.endsWith(".sql")).sort();

    for (const file of sqlFiles) {
      console.log(`\n--- Executing ${file} ---`);
      const filePath = path.join(sqlDir, file);
      const sqlContent = await fs.readFile(filePath, "utf8");

      // Split the file content by the '/' separator on a new line
      const statements = sqlContent
        .split(/^\/$/m)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      for (const statement of statements) {
        try {
          // REMOVED THE PROBLEMATIC LINE HERE
          await connection.execute(statement);
          console.log(`Successfully executed statement.`);
        } catch (err) {
          console.error(`Error executing statement from ${file}:`, err);
          throw err; // Stop on first error
        }
      }
    }

    console.log("\n✅ Database initialization completed successfully!");
  } catch (err) {
    console.error("❌ Database initialization failed:", err);
    process.exit(1); // Exit with error code
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log("\nDatabase connection closed.");
      } catch (err) {
        console.error("Error closing the connection:", err);
      }
    }
  }
}

run();
