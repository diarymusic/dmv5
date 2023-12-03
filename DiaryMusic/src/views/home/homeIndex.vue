<script setup>
import {ref, onMounted, watch, computed} from 'vue'
import {Html5QrcodeScanner} from 'html5-qrcode'
import {useRouter} from 'vue-router'
const router = useRouter()
import $ from 'jquery'
import {getMyInfoByToken,_DEFAULTUSERINFO,notify} from '@/classes/user'
import _ from "lodash";
import io from 'socket.io-client'
function showLastToast() {
  var toastElList = [].slice.call(document.querySelectorAll('.toast'))
  var toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl)
  })
  toastList[toastList.length - 1].show()
}

const user = ref(_DEFAULTUSERINFO);
const isLogin = ref(false)
const isAdmin = ref(false)
const scanmsg = ref('')
const scaning = ref(true)
const scansid = ref(0)
const scantype = ref(1)
function getInfo(){

  getMyInfoByToken().then(
      v=>{
        // 成功登录
        user.value = v.user;
        isLogin.value = v.isLogin
        isAdmin.value = v.isAdmin
      },
      e=>{
        if(e===0){
          notify({
            title:'登录到Diary Music 官网',
            body:'建议您登录到Diary Music 官网来体验官网的完整功能。',
          }).catch(arg=>{
            $(`<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-animation="true" data-bs-autohide="false">
                        <div class="toast-header">
                            <img src="" class="rounded me-2" alt="">
                            <strong class="me-auto">提示</strong>
                            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div class="toast-body">
                            ${arg.body}
                            <div class="mt-2 pt-2 border-top">
                                <a href="#/login" class="me-3">前往</a>
                            </div>
                        </div>
                    </div>`).appendTo('.toast-container')
            showLastToast()
          })
        }else{
          //   其他

        }
      }
  )

}
const dev = computed(()=>{
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('Android') > -1) {
    return false;
  } else {
    return true;
  }
})
function logout() {
  user.value=_DEFAULTUSERINFO
  isLogin.value=false
  isAdmin.value=false
  fetch('/api/logout',{headers:{Token:localStorage.token}}).then(d => d.json()).then(d => localStorage.token = d.status == 200 ? d.token : undefined)
  router.push('/login')
}
watch(user,(v)=>{

})
onMounted(()=> {
  getInfo()
})
var scanner = null;
function scanqr(){
  if(scanner){scanner.clear()}
  function onScanSuccess(t,r) {
    let re = new RegExp('^DiaryMusicLoginSid_')
    let pm = new Promise((resolve, reject)=>{
      let sid = r.decodedText
      // if scan login
      if(re.test(atob(sid))){
        let s = atob(sid).split('DiaryMusicLoginSid_')[1]
        console.log(Date.now()-s)
        if(Date.now()-s>60000){
          reject(s)
          //   timeout in 1min
        }else{

          scaning.value=false
          resolve(s)
        }
      }
      //   end scan
    }).then(v=>{
      scanmsg.value='确认登录到其他设备？'
      scansid.value=v

    }).catch(e=>{
      var errno = e
      $(`<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-animation="true" data-bs-autohide="false">
                        <div class="toast-header">
                            <img src="" class="rounded me-2" alt="">
                            <strong class="me-auto">二维码过期</strong>
                            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                    </div>`).appendTo('.toast-container')
      showLastToast()})


  }

  function onScanFail(e) {

  }

  scanner = new Html5QrcodeScanner('reader', {
    fps: 5, qrbox: {width:250,height:250}
  }, false)
  scanner.render(onScanSuccess,onScanFail)

}
function scanoper(){
  let form = new FormData()
  form.append('ssid',scansid.value)
  form.append('token',localStorage.token)
  let ws = io(document.domain)
  ws.on('connect',()=>{
    ws.emit('sendtoken',{ssid:scansid.value,token:localStorage.token})
    ws.on('logined',()=>{
      $(`<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-animation="true" data-bs-autohide="false">
                        <div class="toast-header">
                            <strong class="me-auto">登录成功</strong>
                            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                    </div>`).appendTo('.toast-container')
      showLastToast()
      $('.scanCls').click()

      if(scanner){scanner.clear()}
    })
  })
}
function scancl(){
  if(scanner){scanner.clear()}
}
</script>
<template>
  <div class="bg-white dark:bg-black">
    <nav class="navbar navbar-light bg-light fixed-top flex-row bg-transparent text-black dark:text-white pointer-events-none">
      <div class="container-fluid grid justify-between">
        <ul class="navbar-nav justify-content-start flex-md-nowrap py-1 px-3 bg-white rounded d-none d-md-flex flex-row pointer-events-auto">
          <li class="nav-item pe-3">
            <router-link class="nav-link active text-black dark:text-white" aria-current="page" to="/">主页</router-link>
          </li>
          <li class="nav-item pe-3">
            <router-link class="nav-link text-black dark:text-white" to="/intro">节奏阵列展示页面</router-link>
          </li>
          <li class="nav-item pe-3">
            <router-link class="nav-link text-black dark:text-white" to="/passage">文章</router-link>
          </li>
          <li class="nav-item pe-3">
            <router-link class="nav-link text-black dark:text-white" to="/chat">站内聊天</router-link>
          </li>
          <!-- admin? -->
          <template v-if="isAdmin">
            <li class="nav-item pe-3">
              <router-link class="nav-link text-black dark:text-white" to="/backstage">后台管理</router-link>
            </li>
          </template>

        </ul>
        <!-- <a class="navbar-brand logo w-1/2 m-0" href="#">
          <img class="w-100 hidden dark:block" src="res/dmll.png" />
          <img class="w-100 block dark:hidden" src="res/dmld.png" />
        </a> -->
        <div class=" py-1 px-1 bg-white rounded rounded-s-full ">
          <div class="logo-name" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
               aria-controls="offcanvasNavbar">
            <div class="logo-image">
              <img :src="user.ava" alt="" id="userAvatar" class="userAvatar">
            </div>
            <span class="logo_name pe-3 d-none d-md-flex userName me-3" id="userName">{{user.name}}</span>
            <template v-if="isLogin">
              <span class="logo_uid pe-3 d-none d-md-flex userId" id="userId">UID: {{user.uid}}</span>
            </template>
          </div>
        </div>

      </div>
    </nav>
    <div class="offcanvas offcanvas-end text-black" tabindex="-1" id="offcanvasNavbar"
         aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">DIARY MUSIC -- 记事簿音乐</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div class="logo-name mb-3 text-nowrap">
          <div class="logo-image">
            <img :src="user.ava" alt="" id="userAvataroc" class="userAvatar">
          </div>

          <span class="logo_name userName me-3" id="userNameoc">{{user.name}}</span>
          <template v-if="isLogin">
            <span class="logo_uid userId me-3" id="userIdoc">UID: {{user.uid}}</span>
          </template>
        </div>
        <!--login?  -->
        <template v-if="isLogin">
          <a @click="scanqr" v-if="!dev"        type="button"
             class="me-3 scanLnch"
             data-bs-toggle="modal"
             data-bs-target="#scanModal"><i class="ri-qr-scan-2-line me-1"></i>扫描二维码</a>
          <router-link to="changeInfo" class="me-3">修改信息</router-link>
          <router-link to="my" class="me-3">个人中心</router-link>

          <a @click="logout" class="signoutBtn b me-3">退出登录</a>

        </template>

        <!-- guest? -->
        <template v-else><router-link to="login" class="me-3">登录</router-link></template>

        <div class="separator"></div>
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/">主页</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/intro">嵌入展示「节奏阵列」 页面</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://www.beatarray.com/label/DiaryMusic">我们的「节奏阵列」主页</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/passage">文章</router-link>
          </li>
          <li class="nav-item pe-3">
            <router-link class="nav-link" to="/chat">站内聊天</router-link>
          </li>

          <!-- admin? -->
          <template v-if="isAdmin">
            <li class="nav-item pe-3">
              <router-link class="nav-link" to="/backstage">后台管理</router-link>
            </li>
          </template>

        </ul>
      </div>
    </div>
    <router-view />
    <div class="toast-container position-fixed p-3 bottom-0 end-0 text-black">
    </div>
    <!-- ========== End Toast ========== -->
    <div class="modal fade" id="broadcast" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
         role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title mth" id="modalTitleId"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body mtb">
          </div>
          <div class="modal-footer justify-content-start">
            <p>发布者：<span class="passOwner"></span></p>
          </div>
        </div>
      </div>
    </div>
    <footer>

    </footer>
    <button
        type="button"
        class="scanLnch hidden"
        data-bs-toggle="modal"
        data-bs-target="#scanModal"
    ></button>

    <!-- Modal Body -->
    <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
    <div
        class="modal fade"
        id="scanModal"
        tabindex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
    >
      <div
          class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm"
          role="document"
      >
        <div class="modal-content shadow-lg">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTitleId">扫描二维码</h5>
            <button
                type="button"
                class="btn-close scanCls"
                data-bs-dismiss="modal"
                aria-label="Close"
            ></button>
          </div>
          <div class="modal-body flex flex-row justify-center align-center">
            <div id="reader" v-if="scaning"></div>
            <div v-else class="align-center justify-center text-center">
              <span class="text-4xl">{{scanmsg}}</span>
              <div class="row justify-content-center align-content-center">
                <div class="col-6"><button class="btn bg-cyan-300" @click="scanoper">确定</button></div>
                <div class="col-6"><button class="btn bg-white" @click="scancl">取消</button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
@import 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@500&display=swap';
*{
  font-family: 'Noto Sans SC';
}
html{
  min-height: 100vh;
}
#app {
  min-height: 100vh;
  font-family: 'Noto Sans SC' !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.logo{
  width: 10%;
}
.logo-name {
  display: flex;
  align-items: center;
}

.logo-image {
  display: flex;
  justify-content: center;
  min-width: 45px;
}

.logo-image img {
  width: 40px;
  object-fit: cover;
  border-radius: 50%;
}

.logo-name .logo_name {
  font-size: 22px;
  font-weight: 600;
  color: var(--text-color);
  margin-left: 14px;
  transition: var(--tran-05);
}
.navbar{
  transition: transform .5s;
}
.nav-wrap{
  transform:translateY(-200px);

}
</style>