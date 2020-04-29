let ipcRenderer = require('electron').ipcRenderer;
const { remote } = require('electron')
let axios = require('axios');
var request = require("../assets/js/request.js");
const Store = require('electron-store');
const store = new Store();

var loginbtn = document.getElementById('login');
var loginUserData = store.get('login-user');
console.log(loginUserData);
if(loginUserData){
  var nameInput = document.querySelector('.uid');
  var pwdInput = document.querySelector('.pwd');
  nameInput.value=loginUserData.mobile;
  pwdInput.value=loginUserData.pwd;
}
if (loginbtn) {
    loginbtn.addEventListener('click', () => {
      var nameVal = document.querySelector('.uid').value;
      var pwd = document.querySelector('.pwd').value;
        // ipcRenderer.send('window-max');
        // ipcRenderer.sendSync('synchronous-message','logined')
        // remote.getCurrentWindow().setSize(800, 600);
          request.interfaceRequest('post','http://dev.gn100.com/interface/login',{
            "name":nameVal,"password":pwd
          },(data) =>{
              if(data.code==0){
                store.set('yunke-user', data.result);
                store.set('login-user', {mobile:nameVal,pwd:pwd});
                ipcRenderer.send('window-change-login');
                location.href = "index.html";
              }
          });
        
    })
}