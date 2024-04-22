import sqlite from 'sqlite';
import config from './config.json';

export default callback => {
  sqlite.open(config.databaseFileName).then(async (db) => {
    console.log("Database opened successfully.");
    await db.run(config.dbSchemaMigrationInit);
    const keys = Object.keys(config.dbSchemaMigration);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      try {
        const row = await db.get("SELECT * FROM schema_history WHERE version = ?", [key]);
        if (row) {
          console.log("Schema version " + key + " already applied at " + row.applied_at);
        } else {
          console.log("Applying schema version " + key);
          await db.run(config.dbSchemaMigration[key]);
          await db.run("INSERT INTO schema_history (version, applied_at) VALUES (?, ?)", [key, new Date().toISOString()]);
        }
      } catch (error) {
        console.error("Error applying schema version " + key + ": " + error);
      }
    }

    callback(db);
  }).catch(err => {
    console.log("Error opening the database.", err);
  });
}