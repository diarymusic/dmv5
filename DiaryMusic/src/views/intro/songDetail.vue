<template>
  <section
    class="w-screen px-6 sm:px-8 lg:flex lg:w-full lg:items-center lg:justify-between lg:gap-12"
  >
    <div class="relative overflow-hidden lg:w-1/2 image-container-r2l">
      <img :src="modal.cover" class="image" />
      <div class="mask-r2l"></div>
    </div>
    <div class="relative overflow-y-scroll lg:w-1/2">
      <div class="h-8 lg:h-1"></div>
      <h2 class="font-display font-extrabold pb-2 text-center lg:text-left">
        <span class="text-white-300 text-6xl xl:text-7xl">{{
          modal.songname
        }}</span>
        <div>
          <div class="h-3"></div>
        </div>
      </h2>
      <div class="h-3"></div>
      <h3
        class="font-display text-lg xl:text-xl font-extrabold text-black dark:text-orange-100 leading-4 text-center lg:text-left"
      >
        <template v-for="(artist, index) in modal.artists" :key="index">
          <a
            class="artistlink"
            :href="'https://music.163.com/#/artist?id=' + artist.trueid"
            :data-trueid="artist.trueid"
          >
            {{ artist.name }} </a
          >{{ index + 1 != modal.artists.length ? " / " : "" }}
        </template>
      </h3>
      <div class="h-4"></div>
      <p
        class="text-base text-black dark:text-gray-300 text-center lg:text-left"
        style="white-space: pre-wrap"
      >
        {{ modal.desc }}
      </p>
      <!-- <div class="mask-l2r mask-b2t"></div> -->
      <div class="h-12">
        <div class="xl: flex flex-col gap-4 xl:flex-row justify-center mb-4">
          <template v-if="modal.audioshow">
            <template v-for="(au, i) in modal.audios" :key="i">
              <!-- <audio controls :src="au.src"></audio> -->
              <component
                :is="player"
                :songName="au.name"
                :songPath="au.src"
                :songid="i"
                :songArts="au.artists"
              >
              </component>
            </template>
            <canvas id="frequencySpectrum"></canvas>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import player from "@/components/musicPlayer.vue";
import {ref,onMounted,defineProps} from "vue";
const modal = ref({})
const newsong = ref({})
const temp = ref({})
const songs = ref({})

const props = defineProps(['sid'])
onMounted(()=>{

  var i = props.sid;
  fetch("/api/get163", {
    headers: {
      "Content-Type": "application/json;charset=utf8",
      "Access-Control-Allow-Origin": "*",
    },
  })
      .then((d) => d.json())
      .then((d) => {
        newsong.value = {
          name: "",
          cover: "",
          artists: {
            name: "",
            trueid: "",
          },
          desc: "",
          audioshow: false,
          audios: [],
        }
        songs.value = (d.status = 200)
                ? d.data != undefined
                    ? d.data
                    : {}
                : {}
        modal.value = {
          cover: songs.value[i].cover,
          songname: songs.value[i].name,
          artists: songs.value[i].artists,
          audioshow: false,
          audios: [],
        };
        modal.value.desc = "加载中···";
        fetch(`/api/getAlbum/${songs.value[i].trueid}`)
            .then((r) => r.json())
            .then((r) => {
              modal.value = {
                cover: songs.value[i].cover,
                songname: songs.value[i].name,
                artists: songs.value[i].artists,
                audioshow: false,
                audios: [],
              };
              temp.value = r.resourceState == true ? r : {};
              modal.value.desc =
                  r.resourceState == true
                      ? r.album.description
                      : "__//\n获取失败，请稍后再试···\n- Diary Music -\n//__";
              for (let i = 0; i < r.songs.length; i++) {
                modal.value.audioshow = true;
                let arts = [];
                for (let iar = 0; iar < r.songs[i].ar.length; iar++) {
                  arts.push({
                    n: r.songs[i].ar[iar].name,
                    i: r.songs[i].ar[iar].id,
                  });
                }
                modal.value.audios.push({
                  name: `#${i + 1}: ${r.songs[i].name}`,
                  artists: arts,
                  src: `/api/getMp3/${r.songs[i].id}`,
                });
              }
            });
      })
      .catch(
          (e) =>
              (modal.value.desc = `__//\n获取失败，请稍后再试···\n错误代码：${e}\n- Diary Music -\n//__`)
      );
})
</script>
