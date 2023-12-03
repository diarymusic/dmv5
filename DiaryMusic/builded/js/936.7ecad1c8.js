"use strict";(self["webpackChunkdm"]=self["webpackChunkdm"]||[]).push([[936],{2536:function(s,t,e){e.r(t),e.d(t,{default:function(){return A}});var a=e(9199);const l={class:"w-screen px-6 sm:px-8 lg:flex lg:w-full lg:items-center lg:justify-between lg:gap-12"},n={class:"relative overflow-hidden lg:w-1/2 image-container-r2l"},i=["src"],o=(0,a._)("div",{class:"mask-r2l"},null,-1),r={class:"relative overflow-y-scroll lg:w-1/2"},d=(0,a._)("div",{class:"h-8 lg:h-1"},null,-1),c={class:"font-display font-extrabold pb-2 text-center lg:text-left"},g={class:"text-white-300 text-6xl xl:text-7xl"},h=(0,a._)("div",null,[(0,a._)("div",{class:"h-3"})],-1),u=(0,a._)("div",{class:"h-3"},null,-1),m={class:"font-display text-lg xl:text-xl font-extrabold text-black dark:text-orange-100 leading-4 text-center lg:text-left"},p=["href","data-trueid"],x=(0,a._)("div",{class:"h-4"},null,-1),f={class:"text-base text-black dark:text-gray-300 text-center lg:text-left",style:{"white-space":"pre-wrap"}},w={class:"h-12"},v={class:"xl: flex flex-col gap-4 xl:flex-row justify-center mb-4"},_=(0,a._)("canvas",{id:"frequencySpectrum"},null,-1);function y(s,t,e,y,k,b){return(0,a.wg)(),(0,a.iD)("section",l,[(0,a._)("div",n,[(0,a._)("img",{src:k.modal.cover,class:"image"},null,8,i),o]),(0,a._)("div",r,[d,(0,a._)("h2",c,[(0,a._)("span",g,(0,a.zw)(k.modal.songname),1),h]),u,(0,a._)("h3",m,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(k.modal.artists,((s,t)=>((0,a.wg)(),(0,a.iD)(a.HY,{key:t},[(0,a._)("a",{class:"artistlink",href:"https://music.163.com/#/artist?id="+s.trueid,"data-trueid":s.trueid},(0,a.zw)(s.name),9,p),(0,a.Uk)((0,a.zw)(t+1!=k.modal.artists.length?" / ":""),1)],64)))),128))]),x,(0,a._)("p",f,(0,a.zw)(k.modal.desc),1),(0,a._)("div",w,[(0,a._)("div",v,[k.modal.audioshow?((0,a.wg)(),(0,a.iD)(a.HY,{key:0},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(k.modal.audios,((t,e)=>((0,a.wg)(),(0,a.j4)((0,a.LL)(s.player),{key:e,songName:t.name,songPath:t.src,songid:e,songArts:t.artists},null,8,["songName","songPath","songid","songArts"])))),128)),_],64)):(0,a.kq)("",!0)])])])])}e(560);var k=e(452),b={props:["sid"],components:{player:k.Z},data(){return{modal:{}}},created(){var s=this.sid;fetch("/api/get163",{headers:{"Content-Type":"application/json;charset=utf8","Access-Control-Allow-Origin":"*"}}).then((s=>s.json())).then((t=>{this.newsong={name:"",cover:"",artists:{name:"",trueid:""},desc:"",audioshow:!1,audios:[]},this.songs=(t.status=200)&&void 0!=t.data?t.data:{},this.modal={cover:this.songs[s].cover,songname:this.songs[s].name,artists:this.songs[s].artists,audioshow:!1,audios:[]},this.modal.desc="加载中···",fetch(`/api/getAlbum/${this.songs[s].trueid}`).then((s=>s.json())).then((t=>{this.modal={cover:this.songs[s].cover,songname:this.songs[s].name,artists:this.songs[s].artists,audioshow:!1,audios:[]},this.temp=1==t.resourceState?t:{},this.modal.desc=1==t.resourceState?t.album.description:"__//\n获取失败，请稍后再试···\n- Diary Music -\n//__";for(let s=0;s<t.songs.length;s++){this.modal.audioshow=!0;let e=[];for(let a=0;a<t.songs[s].ar.length;a++)e.push({n:t.songs[s].ar[a].name,i:t.songs[s].ar[a].id});this.modal.audios.push({name:`#${s+1}: ${t.songs[s].name}`,artists:e,src:`/api/getMp3/${t.songs[s].id}`})}}))})).catch((s=>this.modal.desc=`__//\n获取失败，请稍后再试···\n错误代码：${s}\n- Diary Music -\n//__`))}},D=e(89);const j=(0,D.Z)(b,[["render",y]]);var A=j}}]);
//# sourceMappingURL=936.7ecad1c8.js.map