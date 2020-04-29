const { app, BrowserWindow, Menu } = require("electron");
const Store = require('electron-store');
const store = new Store();

app.allowRendererProcessReuse = true

// var template = [{     label: "编辑",     submenu: [       {         label:
// "撤销",         accelerator: "CmdOrCtrl+Z",         role: "undo"       }, {
//     label: "重做",         accelerator: "Shift+CmdOrCtrl+Z", role: "redo"
// },       {         type: "separator"       },       {    label: "复制",
// accelerator: "CmdOrCtrl+C",         role: "copy"  },       {         label:
// "粘贴",         accelerator: "CmdOrCtrl+V", role: "paste"       }     ]   },
// {     label: "帮助",     role: "help", submenu: [       {         label:
// "学习更多",         click: function() {
// electron.shell.openExternal("http://electron.atom.io");         }       }   ]
//   } ];

let mainWindow=null;

function createWindow() {
  // const menu = Menu.buildFromTemplate(template) Menu.setApplicationMenu(menu)
  Menu.setApplicationMenu(null);
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 600,
    height: 310,
    // transparent: true,
    resizable: false, //能否改变窗体大小
    // "accept-first-mouse": true,
    icon: __dirname + "/assets/img/yunke.ico",
    title: "云课",
    // frame: false,
    show: false, //是否显示界面 先设置否
    hasShadow: true,
    maximizable: false,
    minimizable: false,
    webPreferences: {
      nodeIntegration: true,
      // webSecurity: false //跨域请求
    },
    // isAlwaysOnTop:true//窗口是否始终在其它窗口之前
  });

  // 加载index.html文件
  mainWindow.loadFile("pages/login.html");
  mainWindow.webContents.openDevTools();
  mainWindow.webContents.on("did-finish-load", function() {
    mainWindow.show();
  });
}

app.whenReady().then(createWindow);

// 当全部窗口关闭时退出。
app.on("window-all-closed", () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出， 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== "darwin") {
    app.quit();
    store.clear();
  }
});

app.on("activate", () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时， 通常在应用程序中重新创建一个窗口。
  if (mainWindow === null) {
    createWindow();
  }
});

let ipcMain = require('electron').ipcMain;
//接收最小化命令
ipcMain.on('window-min', function() {
    mainWindow.minimize();
})
//接收最大化命令
ipcMain.on('window-max', function() {
    if (mainWindow.isMaximized()) {
        mainWindow.restore();
    } else {
        mainWindow.maximize();
    }
})
//接收关闭命令
ipcMain.on('window-close', function() {
    mainWindow.close();
})
//登录改变窗口大小
ipcMain.on('window-change-login', function() {
  mainWindow.setSize(800, 600);
  mainWindow.center();
})
// 改变窗口大小
ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg)
  if (arg === 'logined') {
    mainWindow.setSize(800, 600);
  }
})