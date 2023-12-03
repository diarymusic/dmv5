<script setup>
import $ from "jquery";
import {ref,onMounted} from 'vue'
import {getMyInfoByToken,_DEFAULTUSERINFO} from '@/classes/user'
import {useRouter} from 'vue-router'
const router = useRouter()
const user = _DEFAULTUSERINFO
onMounted(getMyInfoByToken().then(
    v=>{},
    e=>{
      router.push('/login')
    }
))
</script>

<template>
  <section class="w-screen flex items-center justify-center px-6 sm:px-8 lg:flex lg:w-full lg:items-center lg:justify-between lg:gap-12">
    <div class="lg:mx-auto lg:max-w-2xl">
      {{user.name}}
    </div>
  </section>
</template>

<style scoped>

</style>