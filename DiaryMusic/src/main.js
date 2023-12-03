import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './main.css';
import _ from 'lodash';
import $ from "jquery";
var stat = false;
var currposi = 0;
console.log(`
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
██░▄▄▀█▄░▄█░▄▄▀██░▄▄▀██░███░████░▄▀▄░██░██░██░▄▄▄░█▄░▄██░▄▄▀██
██░██░██░██░▀▀░██░▀▀▄██▄▀▀▀▄████░█░█░██░██░██▄▄▄▀▀██░███░█████
██░▀▀░█▀░▀█░██░██░██░████░██████░███░██▄▀▀▄██░▀▀▀░█▀░▀██░▀▀▄██
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

 __       __               __  __
|  \\| /\\ |__)\\_/  |\\/|/  \\(_ |/  
|__/|/--\\| \\  |   |  |\\__/__)|\\__
                                 `)
$('.offcanvas a').on('click',()=>{
    $('button[data-bs-dismiss=offcanvas]').click()
})
const onScroll = _.throttle(function() {
    if(window.scrollY<currposi){
        document.querySelector('nav.navbar').classList.remove('nav-wrap')
    }else
    if (window.scrollY > 200 &&!stat) {
        document.querySelector('nav.navbar').classList.add('nav-wrap')
        // 在这里添加你想要触发的代码
    }
    console.log(window.scrollY)
    console.log(currposi)
currposi=window.scrollY
}, 200); // 这里的200是节流的时间间隔，单位是毫秒
const hashc = _.throttle(function (){
    document.querySelector('nav.navbar').classList.remove('nav-wrap')
})

window.addEventListener('scroll', onScroll);
window.addEventListener('hashchange', hashc);
createApp(App).use(store).use(router).mount('#app')