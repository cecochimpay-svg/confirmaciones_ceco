const { app, BrowserWindow, shell, globalShortcut } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1020,
    height: 800,
    minWidth: 880,
    minHeight: 640,
    autoHideMenuBar: true,
    title: "Confirmación de Puesto Temporada · CECO S.A.",
    webPreferences: {
      // 1. Aislamiento estricto de contexto
      contextIsolation: true,
      // 2. Desactivar Node directo en el frontend
      nodeIntegration: false,
      // 3. Puente seguro a través de preload
      preload: path.join(__dirname, 'preload.js'),
      // 4. Configuración de ejecución
      sandbox: false, // en false para que preload pueda usar require('./conexion.js')
      webSecurity: true,
      allowRunningInsecureContent: false,
      // 🔒 Deshabilitar DevTools a nivel de motor de renderizado
      devTools: false
    }
  });

  // 🔒 Remover completamente el menú superior de la ventana
  win.removeMenu();

  // 🔒 Bloquear el menú contextual (clic derecho -> Inspeccionar)
  win.webContents.on('context-menu', (e) => {
    e.preventDefault();
  });

  // 🔒 Deshabilitar atajos de teclado específicos en la ventana activa (F12, DevTools, Recargar)
  win.webContents.on('before-input-event', (event, input) => {
    const isControlOrCmd = input.control || input.meta;
    const key = input.key.toLowerCase();

    // Bloquear F12
    if (input.key === 'F12') {
      event.preventDefault();
    }
    // Bloquear Ctrl+Shift+I / Cmd+Option+I (Abrir DevTools)
    if (isControlOrCmd && input.shift && key === 'i') {
      event.preventDefault();
    }
    // Bloquear Ctrl+Shift+J / Cmd+Option+J (Abrir Consola)
    if (isControlOrCmd && input.shift && key === 'j') {
      event.preventDefault();
    }
    // Bloquear Ctrl+Shift+C (Inspeccionar elemento)
    if (isControlOrCmd && input.shift && key === 'c') {
      event.preventDefault();
    }
    // Bloquear Ctrl+U (Ver código fuente HTML)
    if (isControlOrCmd && key === 'u') {
      event.preventDefault();
    }
    // Bloquear F5 o Ctrl+R (Refrescar la app)
    if (input.key === 'F5' || (isControlOrCmd && key === 'r')) {
      event.preventDefault();
    }
  });

  // 5. Bloquear navegación inesperada fuera de la app
  win.webContents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    if (parsedUrl.protocol !== 'file:') {
      event.preventDefault();
    }
  });

  // 6. Abrir enlaces externos siempre en el navegador del sistema
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:') || url.startsWith('http:')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

// 🔒 Desregistrar atajos globales al cerrar la aplicación
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});