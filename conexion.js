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

// 🔒 1. Bloquear Clic Derecho en la Web
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// 🔒 2. Bloquear Teclas de Inspección (F12, DevTools, Recargar)
document.addEventListener('keydown', (e) => {
  const isCtrlOrCmd = e.ctrlKey || e.metaKey;
  const key = e.key.toLowerCase();

  // Bloquear F12
  if (e.key === 'F12') {
    e.preventDefault();
  }
  // Bloquear Ctrl+Shift+I / J / C (DevTools, Consola, Inspeccionar)
  if (isCtrlOrCmd && e.shiftKey && ['i', 'j', 'c'].includes(key)) {
    e.preventDefault();
  }
  // Bloquear Ctrl+U (Ver fuente) y Ctrl+S (Guardar página)
  if (isCtrlOrCmd && ['u', 's'].includes(key)) {
    e.preventDefault();
  }
  // Bloquear F5 y Ctrl+R (Refrescar)
  if (e.key === 'F5' || (isCtrlOrCmd && key === 'r')) {
    e.preventDefault();
  }
});

// 🔒 3. Anti-Debugger (Invalida la consola si logran abrirla por el menú del navegador)
setInterval(() => {
  const t0 = performance.now();
  debugger;
  const t1 = performance.now();
  if (t1 - t0 > 100) {
    document.body.innerHTML = `
      <div style="text-align:center; padding:50px; font-family:sans-serif; color:#991B1B;">
        <h2>Acceso bloqueado por razones de seguridad</h2>
      </div>`;
  }
}, 1000);

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