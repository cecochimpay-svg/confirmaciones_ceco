const { contextBridge } = require('electron');
const path = require('path');

let conexionNativa = null;
try {
  conexionNativa = require('./conexion.js');
} catch (e) {
  console.warn('[Preload] Módulo de conexión no disponible:', e.message);
}

// Exponer de forma segura a window.electronAPI
contextBridge.exposeInMainWorld('electronAPI', {
  esElectron: true,
  queryCampo: async (sql, params) => {
    if (conexionNativa && typeof conexionNativa.queryCampo === 'function') {
      return await conexionNativa.queryCampo(sql, params);
    }
    throw new Error('Conexión a MySQL Campo no disponible.');
  },
  obtenerModuloXLSX: () => {
    try {
      return require('xlsx');
    } catch (e) {
      return null;
    }
  }
});