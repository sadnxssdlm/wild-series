import "dotenv/config";

import mysql from "mysql2/promise";
import type { RowDataPacket } from "mysql2/promise";

// Get variables from .env file for database connection
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

class ProgramRepository {
  private databaseClient: mysql.Pool;

  constructor() {
    // Create a connection pool to the database
    this.databaseClient = mysql.createPool({
      host: DB_HOST,
      port: DB_PORT ? Number.parseInt(DB_PORT, 10) : undefined,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });
  }

  accessData = async (): Promise<void> => {
    try {
      const programRepository = new ProgramRepository();

      const programs = await programRepository.readAll();

      programRepository.close();

      console.info(programs);
    } catch (err) {
      console.error(
        "Error accessing the database:",
        (err as Error).message,
        (err as Error).stack,
      );
    }
  };

  async readAll(): Promise<RowDataPacket[]> {
    // Access data
    const [rows] = await this.databaseClient.query<RowDataPacket[]>(
      "SELECT * FROM program",
    );

    return rows;
  }

  close(): void {
    // Close the connection pool
    this.databaseClient.end();
  }
}

export default ProgramRepository;
