<template>
  <div class="bg-white text-black dark:text-white">
    <div id="page" class="site">
      <div class="container">
        <div class="row justify-content-center align-items-center g-2">
          <div class="col-xs-8 col-sm-10 col-md-6 col-lg-6">
            <div class="hero">
              <h1 class="typing" data-text="在此注册到Diary Music 官网.">
                在此注册到Diary Music 官网.
              </h1>
              <p>如果您已拥有账号,您可<a href="#/login">在此登录</a>.</p>
            </div>
          </div>
          <div class="col-xs-8 col-sm-10 col-md-6 col-lg-6">
            <div class="login">
              <div class="main text-black">

                  <form>
                    <template v-if="verify">
                      <div class="side-icon">
                        <div class="mb-3"><span class="text-2xl">你的邮箱为：</span><span>{{lockem}}</span></div>
                        <div class="row justify-content-center align-items-center">
                          <div class="col-12">
                            <input :value="lockem" disabled="disabled"/>
                          </div>
                        </div>
                        <div class="row justify-content-center align-items-center">
                          <div class="col-8" id="vfi">
                            <input v-model="vf" placeholder="验证码" required type="number"/>
                          </div>
                          <div class="col-4" id="vfb">
                            <button type="button" class="send" @click="sendVerf">
                              <span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true" id="vfsp"></span>
                              发送
                            </button>
                          </div>
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      <div class="side-icon">
                        <input
                            type="text"
                            name="un"
                            placeholder="您的用户名"
                            v-model="un"
                            required
                        />
                        <i class="ri-account-box-line"></i>
                      </div>
                      <div class="side-icon">
                        <input
                            type="email"
                            name="ue"
                            placeholder="您的邮箱"
                            v-model="em"
                            required
                        />
                        <i class="ri-mail-line"></i>
                      </div>
                      <div class="side-icon">
                        <div
                            class="row justify-content-center align-items-center g-2 avaUpl"
                        >
                          <div class="col-12 c10">
                            <input
                                class="form-control"
                                type="file"
                                id="fileAjax"
                                name="fileAjax"
                                placeholder="上传一个头像"
                                style="height: 100%"
                                accept=".jpg,.png,.jpeg,.gif"
                                required
                                @change="showPrv"
                            />
                            <i class="ri-image-add-fill"></i>
                          </div>
                        </div>
                      </div>
                      <div class="side-icon">
                        <input
                            id=""
                            type="password"
                            name="pw"
                            placeholder="您的密码"
                            required
                            v-model="pw"
                        />
                        <i class="ri-eye-off-line" id="eye" @click="eyeOnOff"></i>
                      </div>
                      <div class="side-icon">
                        <input type="password" id="repsw" name="repsw" placeholder="重复密码" required v-model="pww"/>
                        <i class="ri-eye-off-line"></i>
                      </div>
                    </template>
                    <div>
                      <template v-if="verify">
                        <button type="button" class="submit" @click="verificate">
                      <span
                          class="spinner-border spinner-border-sm d-none"
                          role="status"
                          aria-hidden="true"
                          id="rsp"
                      ></span>
                          验证
                        </button>
                      </template>
                      <template v-else>
                        <button type="button" class="submit" @click="regi">
                      <span
                          class="spinner-border spinner-border-sm d-none"
                          role="status"
                          aria-hidden="true"
                          id="rsp"
                      ></span>
                          注册
                        </button>
                      </template>
                    </div>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal trigger button -->
  <button
    type="button"
    class="prvLnch hidden"
    data-bs-toggle="modal"
    data-bs-target="#PrvModal"
  ></button>

  <!-- Modal Body -->
  <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
  <div
    class="modal fade"
    id="PrvModal"
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
          <h5 class="modal-title" id="modalTitleId">上传头像</h5>
          <button
            type="button"
            class="btn-close prvCls"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body flex flex-row justify-center align-center">
          <img class="w-50 h-50" :src="imgTemp" alt="">
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消上传
          </button>
          <button type="button" class="btn btn-primary" @click="uplImg">上传</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const tpl = `<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-animation="true" data-bs-autohide="false">
                            <div class="toast-header">
                                <img src="" class="rounded me-2" alt="">
                                <strong class="me-auto">{{msg}}</strong>
                                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                        </div>`;
import $ from "jquery";
import Handlebars from "handlebars";
function showLastToast() {
  var toastElList = [].slice.call(document.querySelectorAll(".toast"));
  var toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl);
  });
  toastList[toastList.length - 1].show();
}

export default {
  data() {
    return {
      flag: false,
      lockem:'',
      un:'',
      em: "",
      pw: "",
      pww: "",
      vf: "",
      img:'default.png',
      imgTemp:'default.png',
      verify:false,
    };
  },
  methods: {
    eyeOnOff() {
      if (!this.flag) {
        $("#eyeInput").attr("type", "text");
        $("#eye").attr("class", "ri-eye-line");
        this.flag = true;
      } else {
        $("#eyeInput").attr("type", "password");
        $("#eye").attr("class", "ri-eye-off-line");
        this.flag = false;
      }
    },
    sendVerf() {
      if (this.lockem !== null)
        fetch(`/api/sendCode/${this.lockem}`)
          .then((d) => d.json())
          .then((d) => {
            let dt = { msg: "发送失败" };
            dt.msg = d.status == 200 ? "发送成功" : "发送失败";
            $(Handlebars.compile(tpl)(dt).toString()).appendTo(
              ".toast-container"
            );
            showLastToast();
          });
    },
    verificate(){
      let form = new FormData();
      form.append("em", this.lockem);
      form.append("vf", this.vf);
 new Promise((resolve, reject)=>{
          if(this.lockem==''){
            resolve(2)
          }else if(!this.vf==''){
            fetch('/api/verify',{
              method:'post',
              body:form
            }).then(r=>r.json()).then(r=>{
              if(r.status===200 && r.code===0){
                location.hash='#/'
                resolve(0)
              }else{
                resolve(1)
              }
            }).catch(e=> {
              resolve(4)
            })
          }else{
            resolve(3)
          }
        }).then(val=>{
          var m='';
          switch (val){
            case 0:m='验证成功';break;
            case 1:m='验证失败:请检查验证码是否正确';break;
            case 2:m='验证失败:请返回注册';break;
            case 3:m='验证失败:验证码不能为空';break;
            case 4:m='验证失败:系统错误';break;
            default:m='验证失败:系统错误';break;
          }
          $(Handlebars.compile(tpl)({ msg: m }).toString()).appendTo(
              ".toast-container"
          );
          showLastToast();
        })

    },
    regi() {
      console.log('test')
      this.lockem=this.em
      if (
          this.un.toString() !== "" &&
        this.em.toString() !== "" &&
        this.pw.toString() !== "" &&
        this.pww.toString() !== "" &&
        this.pww.toString() === this.pw.toString()
      ) {
        let form = new FormData();
        form.append("un", this.un);
        form.append("em", this.em);
        form.append("pw", b64_sha256(this.pw));
        form.append('ap',this.img)


        fetch("/api/register", {
          method: "post",
          body: form,
        })
          .then((r) => r.json())
          .then((r) => {
            localStorage.setItem("token", r.token);
            if(r.status==200&&r.code==0){
              this.verify = true
            }
            $(Handlebars.compile(tpl)({ msg: `${r.status == 200?`注册成功: 需要下一步验证`:`注册失败: ${r.code==1?'系统错误':r.code==2?'邮箱已存在':r.code==3?'用户名已存在':''}`}` }).toString()).appendTo(
              ".toast-container"
            );
            showLastToast();
          })
          .catch((e) => {
            $(Handlebars.compile(tpl)({ msg: `注册失败: ${r.code==1?'系统错误':r.code==2?'邮箱已存在':r.code==3?'用户名已存在':''}` }).toString()).appendTo(
              ".toast-container"
            );
            showLastToast();
            console.error(e);
          });
      } else {
        $(
          Handlebars.compile(tpl)({
            msg: "注册失败，请检查是否正确填写信息",
          }).toString()
        ).appendTo(".toast-container");
        showLastToast();
      }
    },
    showPrv() {
      var reader = new FileReader();
      reader.readAsDataURL($('#fileAjax').prop('files')[0]);
      reader.onload = ()=>{
        try{
          this.imgTemp = reader.result;
          $('.prvLnch').click()
          console.log(reader.result)
        }catch(e){

        }

      }
      reader.addEventListener('abort error',()=>{
      })
    },
    uplImg(){
      this.img = this.imgTemp;
      $('.prvCls').click()
    }
  },
  created() {},
  mounted() {
    fetch('/api/getUserInfo', {
      headers: { Token: localStorage.token }
    }).then(d => d.json()).then(d => {
      if(d.status==200&&d.verified==false){
        this.lockem=d.data.acc
        this.verify=true
      }
    })
  },
};
</script>
<style scoped>
@import "@/assets/css/style.css";
</style>
