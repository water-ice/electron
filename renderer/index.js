let ipcRenderer = require('electron').ipcRenderer;
// var max = document.getElementById('max');
// if (max) {
//     max.addEventListener('click', () => {
//         //发送最大化命令
//         ipcRenderer.send('window-max');
//         //最大化图形切换
//         if (max.getAttribute('src') == 'images/max.png') {
//             max.setAttribute('src', 'images/maxed.png');
//         } else {
//             max.setAttribute('src', 'images/max.png');
//         }
//     })
// }

// var min = document.getElementById('min');
// if (min) {
//     min.addEventListener('click', () => {
//         //发送最小化命令
//         ipcRenderer.send('window-min');
//     })
// }

// var close = document.getElementById('close');
// if (close) {
//     close.addEventListener('click', () => {
//         //发送关闭命令
//         ipcRenderer.send('window-close');
//     })
// }

const Store = require('electron-store');
const store = new Store();

var userStore = store.get('yunke-user');
// console.log(userStore);
var userDiv = document.querySelector('#user');
var userFace = userDiv.querySelector('.user-face');
var userName = userDiv.querySelector('.user-name');
userFace.setAttribute('src',userStore.small);
userName.innerHTML=userStore.real_name;

// 获取摄像头和麦克源信息
// navigator.mediaDevices.enumerateDevices()
//   .then(devices => devices.filter(d => d.kind === 'videoinput'))
//   .then(devices => console.log(devices)) // devices 为摄像头数组);

//获取当前屏幕和应用窗口源信息
const { desktopCapturer } = require('electron');

var captureScreens = () => {
    
    const screenNames = document.getElementById('screenNames')
    const screenInfo = document.getElementById('screenInfo')
    const canvas = document.getElementById('thumbnailCanvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 0
    canvas.height = 0
    screenNames.textContent = ''
    screenInfo.textContent = ''
    document.getElementById('screenVideos').innerHTML='';
    desktopCapturer.getSources({
      types: ['window', 'screen']
      // thumbnailSize: {
      //   width: 320,
      //   height: 240
      // }
    }, (error, sources) => {
      if (error) console.error(error)
      console.log(sources)
      sources.forEach((source) => {
        const img = new Image()
        const size = source.thumbnail.getSize()
        canvas.width += size.width
        canvas.height = Math.max(canvas.height, size.height)
  
        screenNames.textContent += `${source.id}, ${source.display_id} (${source.name}) | `
        const dx = canvas.width - size.width
        img.onload = () => ctx.drawImage(img, dx, 0)
        img.src = source.thumbnail.toDataURL()
  
        navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: source.id,
              minWidth: 640,
              maxWidth: 640,
              minHeight: 320,
              maxHeight: 320
            }
          }
        })
        .then((stream) => {
            console.log(stream);
            const screenVideos = document.getElementById('screenVideos')
            const video = document.createElement('video')
            screenVideos.appendChild(video)
            video.srcObject = stream
            video.onloadedmetadata = () => {
              video.play()
            }
          })
          .catch((error) => console.error(error))
        })
        const displays = electron.screen.getAllDisplays()
        displays.forEach((display) => {
          const size = display.size
          screenInfo.textContent += `${display.id} (${size.width} x ${size.height}), `
        })
      })
    }
    
    document.getElementById('captureScreens').onclick = captureScreens;