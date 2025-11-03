import pg from 'pg';

const { Pool } = pg;

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://pokemon_db_guqq_user:5wOnofsVWrxijqMQuwQha3sjgdBFM9bD@dpg-d44ecfpr0fns73au6fvg-a/pokemon_db_guqq';

// Crear pool de conexiones
const pool = new Pool({
  connectionString: DATABASE_URL,
});

// Verificar conexión
pool.on('connect', () => {
  console.log('✅ Conectado a PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Error inesperado en PostgreSQL:', err);
  process.exit(-1);
});

// Función helper para ejecutar queries
export const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Ejecutada query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Error en query:', error);
    throw error;
  }
};

// Función para obtener un cliente del pool
export const getClient = () => {
  return pool.connect();
};

export default pool;