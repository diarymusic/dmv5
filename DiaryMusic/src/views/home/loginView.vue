<template>
  <div id="page" class="site">
    <div class="container">
      <div class="row justify-content-center align-items-center g-2">
        <div class="col-xs-8 col-sm-10 col-md-6 col-lg-6">
          <div class="hero text-black dark:text-white">
            <h1 class="typing" data-text="登录到Diary Music 官网.">
              登录到Diary Music 官网.
            </h1>
            <p>
              如果您没有账号,您将无法使用Diary Music 官网的完整功能,<br />您可
              <a href="#/register">在此注册</a>.
            </p>
          </div>
        </div>
        <div class="col-xs-8 col-sm-10 col-md-6 col-lg-6">
          <div class="login">
            <div class="main">
              <form>
                <p class="side-icon text-black">
                  <input
                    class="text-black"
                    type="email"
                    v-model="em"
                    placeholder="您的邮箱地址"
                    autocomplete="email"
                    autofocus
                  />
                  <i class="ri-mail-line"></i>
                </p>
                <p class="side-icon text-black">
                  <input
                    :type="flag?'text':'password'"
                    v-model="pw"
                    placeholder="您的密码"
                    autocomplete="current-password"
                  />
                  <i :class="flag?'ri-eye-line':'ri-eye-off-line'" @mousedown="flag=true"
                  @mouseup="flag=false"></i>
                </p>
                <div class="side-icon text-black">
                  <div class="row justify-content-center align-items-center">
                    <div class="col-8" id="vfi">
                      <input type="number" v-model="vf" placeholder="验证码" />
                      <!-- <i class="ri-mail-send-line"></i> -->
                    </div>
                    <div class="col-4 text-black" id="vfb">
                      <button type="button" class="send" @click="sendVerf">
                        <span
                          class="spinner-border spinner-border-sm d-none"
                          role="status"
                          aria-hidden="true"
                          id="vfsp"
                        ></span>
                        <span class="text-black">发送</span>
                      </button>
                    </div>
                  </div>
                  <!-- <div class="row justify-content-center align-items-center g-2 loginActions">
                                        <div class="col-6"> -->
                  <!-- </div>
                                        <div class="col-6"> -->
                  <router-link to="/forgot">忘记密码</router-link>
                  <!-- </div> -->
                  <!-- </div> -->
                </div>
                <p>
                  <input
                    type="button"
                    class="submit"
                    value="登录"
                    @click="login"
                  />
                </p>
              </form>
              <template v-if="dev">
                <div class="options">
                  <div class="separator">
                    <p>通过其它方式登录</p>
                  </div>
                  <ul>
                    <li><a @click="showQr"
                           class="qrLnch hidden"
                           data-bs-target="#qrModal"
                           data-bs-toggle="modal"
                           role="button"><i class="ri-qr-code-line"></i></a></li>
                  </ul>
                </div>
              </template>

            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Body -->
    <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
    <div
        class="modal fade"
        id="qrModal"
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
            <h5 class="modal-title" id="modalTitleId">扫码登录</h5>
            <button
                type="button"
                class="btn-close prvCls"
                data-bs-dismiss="modal"
                aria-label="Close"
            ></button>
          </div>
          <div class="modal-body flex flex-row justify-center align-center">
            <img class="w-50 h-50" :src="qrimg" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import _, {reject} from "lodash";
import $ from "jquery";
import Handlebars from "handlebars";
import {ref,onMounted,computed} from "vue";
import {useRouter} from 'vue-router'
const router = useRouter()
import {b64_sha256} from "@/assets/js/src/crypt/sha256_m";
import qrcode from 'qrcode-generator'
import io from 'socket.io-client'
import {getMyInfoByToken, notify} from "@/classes/user";
const tpl = `<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-animation="true" data-bs-autohide="false">
                            <div class="toast-header">
                                <img src="" class="rounded me-2" alt="">
                                <strong class="me-auto">{{msg}}</strong>
                                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                        </div>`;
const qr = qrcode(4,'L')
function showLastToast() {
  var toastElList = [].slice.call(document.querySelectorAll(".toast"));
  var toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl);
  });
  toastList[toastList.length - 1].show();
}

const dev = computed(()=>{
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('Android') > -1) {
    return false;
  } else {
    return true;
  }
})
const qrimg = ref('./default.png')
const flag=ref(false)
const em = ref(null)
const pw = ref(null)
const vf = ref(null)
function showQr(){
  var sid = btoa(`DiaryMusicLoginSid_${Date.now()}`)
  qr.addData(sid)
  qr.make()
  qrimg.value=qr.createDataURL()
  let ws = io(document.domain)
  ws.on('connect',()=>{
    ws.emit('qrLogin',sid)
    ws.on('logined',(ev)=>{
      localStorage.setItem('token',ev)
      $('.prvCls').click()
      notify({title:'登录成功',body:''}).catch(arg=>{
        $(`<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-animation="true" data-bs-autohide="false">
                        <div class="toast-header">
                            <strong class="me-auto">${arg.title}</strong>
                            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                    </div>`).appendTo('.toast-container')
        showLastToast()
        getMyInfoByToken()
        router.push('/')
      })
    })
  })
}
function sendVerf() {
  if (em.value !== null)
    fetch(`/api/sendCode/${this.em}`)
        .then((d) => d.json())
        .then((d) => {
          let dt = { msg: "发送失败" };
          dt.msg = d.status == 200 ? "发送成功" : "发送失败";
          $(Handlebars.compile(tpl)(dt).toString()).appendTo(
              ".toast-container"
          );
          showLastToast();
        });
}
function login() {
  new Promise((resolve,reject)=>{
    console.log(em.value)
    if (
        !!em.value  &&
        !!pw.value  &&
        !!vf.value
    ) resolve(0);else reject(0) ;
  }).then(v=>{
    let form = new FormData();
    form.append("em", em.value);
    form.append("pw", b64_sha256(pw.value));
    form.append("vf", vf.value);
    return fetch("/api/login", {
      method: "post",
      body: form,
    })
        .then((r) => r.json())
        .then(v=>{
          let dt = { msg: "登录失败" };
          if(v.status === 200){
            dt.msg =`登录成功，登录有效期为${v.expires}`

            localStorage.setItem("token", v.token);
            $(Handlebars.compile(tpl)(dt).toString()).appendTo(
                ".toast-container"
            );
            showLastToast();
            getMyInfoByToken()
            router.push('/')

          }else{
            $(Handlebars.compile(tpl)(dt).toString()).appendTo(
                ".toast-container"
            );
            showLastToast();
          }



        })
        .catch((e) => {
          console.log('reject')
          reject(2)
        }).finally();
  })
      .catch(e=>{
        let msg = ''
        console.log(e)
        switch (e) {
          case 0:msg='需要填写信息';break;
          case 1:msg='';break;
          case 2:msg='';break;
          case 3:msg='';break;
          case 4:msg='';break;
          case 5:msg='';break;
          default :msg='系统错误';break;
        }
        $(
            Handlebars.compile(tpl)({
              msg: `登录失败${msg==''?'':':'}${msg}`,
            }).toString()
        ).appendTo(".toast-container");
        showLastToast();
      })

}

</script>
<style scoped>
@import "@/assets/css/style.css";
</style>
