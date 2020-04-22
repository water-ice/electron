const { app, BrowserWindow,Menu } = require("electron");

var template = [
  {
    label: "编辑",
    submenu: [
      {
        label: "撤销",
        accelerator: "CmdOrCtrl+Z",
        role: "undo"
      },
      {
        label: "重做",
        accelerator: "Shift+CmdOrCtrl+Z",
        role: "redo"
      },
      {
        type: "separator"
      },
      {
        label: "复制",
        accelerator: "CmdOrCtrl+C",
        role: "copy"
      },
      {
        label: "粘贴",
        accelerator: "CmdOrCtrl+V",
        role: "paste"
      }
    ]
  },
  {
    label: "帮助",
    role: "help",
    submenu: [
      {
        label: "学习更多",
        click: function() {
          electron.shell.openExternal("http://electron.atom.io");
        }
      }
    ]
  }
];

function createWindow() {
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  // 创建浏览器窗口
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor:'#453dee',
    transparent: true,
    icon:__dirname + '/assets/img/yunke.ico',
    title:'云课',
    darkTheme:false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // 加载index.html文件
  win.loadFile("index.html");
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
      app.quit()
    }
})
  
app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (win === null) {
      createWindow()
    }
})