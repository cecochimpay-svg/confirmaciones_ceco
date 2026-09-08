const mysql = require('mysql2/promise');
const { createClient } = require('@supabase/supabase-js');
const mssql = require('mssql');
require('dotenv').config();


// ==========================================
// 2. CLIENTES SUPABASE (CAMPO Y EMPAQUE)
// ==========================================
const supabaseCampo = createClient(
  process.env.SUPABASE_CAMPO_URL || 'https://wkfxrdlyesellygksdgf.supabase.co',
  process.env.SUPABASE_CAMPO_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrZnhyZGx5ZXNlbGx5Z2tzZGdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzODg0ODQsImV4cCI6MjA4Njk2NDQ4NH0.GiATedsuVfLZAXh5gObY-yfsanFPv4Oh-jIChqDrQW8',
  {
    auth: { persistSession: false },
    db: { schema: 'public' }
  }
);

const supabaseGestion = createClient(
  process.env.SUPABASE_GESTION_URL || 'https://zsgqlmfzidazdtpgmuna.supabase.co',
  process.env.SUPABASE_GESTION_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzZ3FsbWZ6aWRhemR0cGdtdW5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMTY3NDIsImV4cCI6MjA5Nzc5Mjc0Mn0.Y9dDHLdQGIOcVS3JaYnbUHWlwul4uiEkkb7udeoF-b0',
  {
    auth: { persistSession: false },
    db: { schema: 'public' }
  }
);


module.exports = {
  poolMySQLCampo,
  queryCampo,
  supabaseCampo,
  supabaseEmpaque,
  getPoolEmpaque,
  queryEmpaque,
  verificarConexiones,
  supabaseGestion
};