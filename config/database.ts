// path: afrosandeca-backend/config/database.ts
import path from 'path';

export default ({ env }) => {
  // Verificamos si la variable de Railway está presente
  const databaseUrl = env('DATABASE_URL');

  if (databaseUrl) {
    // --- Configuración de PRODUCCIÓN (Railway) ---
    // Usa la DATABASE_URL que Railway inyecta
    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString: databaseUrl, // <-- Aquí estaba el error
          ssl: {
            // Requerido para conexiones seguras en la nube
            rejectUnauthorized: false,
          },
        },
        pool: {
          min: env.int('DATABASE_POOL_MIN', 2),
          max: env.int('DATABASE_POOL_MAX', 10),
        },
      },
    };
  }

  // --- Configuración de DESARROLLO (Local) ---
  // Si no hay DATABASE_URL, usa SQLite como fallback
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: path.join(
          __dirname,
          '..',
          '..',
          env('DATABASE_FILENAME', '.tmp/data.db')
        ),
      },
      useNullAsDefault: true,
    },
  };
};