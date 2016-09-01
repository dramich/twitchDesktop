//const ipc = require('ipc');
const {remote} = require('electron')
const {Menu, MenuItem} = remote

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

const popupMenu = new Menu()
popupMenu.append(new MenuItem({label: 'MenuItem1', click() { console.log('item 1 clicked') }}))
popupMenu.append(new MenuItem({type: 'separator'}))
popupMenu.append(new MenuItem({label: 'MenuItem2', type: 'checkbox', checked: true}))

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  popupMenu.popup(remote.getCurrentWindow())
}, false)

Menu.setApplicationMenu(contextMenu);
