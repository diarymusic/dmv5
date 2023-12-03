<script setup>
import {ref, onMounted, watch, computed ,onBeforeMount} from 'vue'
import {useRouter} from 'vue-router'
const router = useRouter()
import $ from 'jquery'
import {getMyInfoByToken,_DEFAULTUSERINFO,notify} from '@/classes/user'
import _ from "lodash";
let cb = $('.nav-toggler');
let t = cb.attr('data-tgt');

var collapsed ='y';
$(cb).click(function(){
  if (collapsed === 'y') {
    $(t).attr('class', 'unfold');
    collapsed = '';
  }else{
    $(t).attr('class', 'close');
    collapsed = 'y';
  }
})

$('#collapseNav').hover(()=>{
  $('#collapseNav').addClass('hov')
},()=>{
  $('#collapseNav').removeClass('hov')
})
$('.closeBtn').on('click',()=>{
  $('#collapseNav').removeClass('hov')
})

const user = ref(_DEFAULTUSERINFO);
const isLogin = ref(false)
const isAdmin = ref(false)
onBeforeMount(()=>{
  getMyInfoByToken().then(v=>{
    if(!v.isAdmin){router.replace('/login')}
    else{
      user.value=v.user
    }
  }).catch(e=>{
    router.replace('/login')
  })
})
</script>

<template>
  <nav class="close" id="collapseNav">
    <div class="logo-name">
      <div class="logo-image">
        <img :src="user.ava" alt="" id="userAvataroc" class="userAvatar">
      </div>
      <span class="logo_name userName me-3" id="userName">{{user.name}}</span>
      <button type="button" class="btn-close text-reset closeBtn" aria-label="Close"></button>
    </div>
    <!-- <span class="logo_uid pe-3 userId" id="userId"></span> -->
    <div class="menu-items">
      <ul class="nav-links">
        <li class="current">
          <router-link to="dashboard">
          <i class="uil uil-estate"></i>
          <span class="link-name">仪表盘</span>
          </router-link></li>
        <li><a href="/backstage/?action=broadcast">
          <i class="uil uil-chart"></i>
          <span class="link-name">公告管理</span>
        </a></li>
        <li><a href="/backstage/?action=artworks">
          <i class="uil uil-image-check"></i>
          <span class="link-name">美工处理</span>
        </a></li>
        <li><a href="/backstage/?action=contacts">
          <i class="uil uil-comments"></i>
          <span class="link-name">发行对接</span>
        </a></li>
        <li><a href="/backstage/?action=members">
          <i class="uil uil-user"></i>
          <span class="link-name">职务管理</span>
        </a></li>
      </ul>

      <ul class="logout-mod">
        <li><a class="signoutBtn" role="button">
          <i class="uil uil-signout"></i>
          <span class="link-name">退出登录</span>
        </a></li>
      </ul>
    </div>
  </nav>
  <div class="top">
    <div class="col-12">
      <a class="nav-toggler sidebar-toggle" role="button" data-tgt="#collapseNav">
        <i class="uil uil-bars sidebar-toggle"></i>
      </a>
    </div>
  </div>

  <div class="grey"></div>

</template>

<style scoped>
@import url('@/assets/css/bsstyle.css');
@import url('https://unicons.iconscout.com/release/v4.0.0/css/line.css');
</style>