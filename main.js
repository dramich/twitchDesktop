const {app, BrowserWindow, dialog, shell, Menu} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 1708, height: 960})

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
  win.on('resize', (e, cmd) => {
    console.log(win.getSize());
  })
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

const contextMenu = Menu.buildFromTemplate([
  {
    label: 'About',
    click() {
      dialog.showMessageBox({title: "Twitch Desktop", type:"info", message: "A Twitch Desktop app", buttons: ["Close"] });
    }
  },
  {
    label: 'Website',
    click() {
      shell.openExternal("https://github.com/dramich/twitchDesktop/");
    }
  },
  {
    type: 'separator'
  },
  {
    label: 'Quit',
    click() {
      app.quit();
    }
  }

]);

Menu.setApplicationMenu(contextMenu);


// var options = {
//   width: 1708,
//   height: 960,
//   channel: "bacon_donut",
//   //video: "{VIDEO_ID}"
// };
// var player = new Twitch.Player("playerHolder", options);
// player.setVolume(0.3);
// player.addEventListener(Twitch.Player.PAUSE, () => { console.log('Player is paused!'); });
