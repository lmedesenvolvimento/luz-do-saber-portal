import { app, BrowserWindow, Menu } from 'electron'

import boostrapAPI from './server/index';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

const MENU_TEMPLATE = [
  {
    label: 'Encerrar Sessão',
    submenu: [
      { 
        label: 'Sair',
        click: () => app.quit()
      }
    ]
  }
]

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://0.0.0.0:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  // Initialize API server
  boostrapAPI();

  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 800,
    useContentSize: true,
    width: 1200,
    webPreferences: {
      webSecurity: false
    }
  })
  
  if (process.env.NODE_ENV !== 'development') {
    mainWindow.maximize()
  }

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', function(){
  createWindow()
  if (process.env.NODE_ENV !== 'development') {
    const menu = Menu.buildFromTemplate(MENU_TEMPLATE)
    Menu.setApplicationMenu(menu)
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
