const {ipcRenderer, remote} = require('electron')
const {Menu, MenuItem} = remote
const $ = require('jQuery');
const clientID = require('./appkey.json');

const contextMenu = Menu.buildFromTemplate([
  {
    label: 'About',
    click() {
      // ipcRenderer.send('open-about');
      const root = 'https://api.twitch.tv/kraken/search/streams?q=minecraft&limit=2';
      $.ajax({
        url: root,
        method: 'GET',
        data: clientID
      }).then(function(data) {
        console.log(data);
      });
    }
  },
  {
    label: 'Website',
    click() {
      ipcRenderer.send('open-website');
    }
  },
  {
    type: 'separator'
  },
  {
    label: 'Quit',
    click() {
      ipcRenderer.send('quit-application');
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

$('#searchBar').submit(function(event) {
  event.preventDefault();
  let searchTerm = document.getElementByID('searchBar').value;
  console.log(searchTerm);
});
