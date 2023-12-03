const wyy01 = "https://wyy01.sout.eu.org"
window.audiosMap = []
function createAudio({ songname, src }) {
    var audio = new Audio(src);
    audiosMap.push({
        songname: songname,
        src: audio,
    });
    console.log("Current Audios : %d", audiosMap.length);
    return audio
}
function showPlaying() {
    audiosMap.forEach(function (audio) {

        if (!audio.src.paused) {
            console.log(audio);
            console.log(!audio.src.paused);
            document.querySelector('.playingname').innerText = audio.songname
            document.querySelector('.notifyPlay').classList.add('show')
        }
    });
}
function pauseAllAudio(th) {
    document.querySelectorAll(".playAndPause").forEach((el) => {
        el.classList.remove("ri-pause-fill")
        el.classList.add("ri-play-fill")
    })
    audiosMap.forEach(function (audio) {
        if (audio.src != th) {
            audio.src.pause();
        }
    });
}
function audioSpectrum() {
    var currentAudio = null;
    audiosMap.forEach((el) => {
        currentAudio = (el.src.isPlaying) ? null : el.src;
    });


    // 创建音频上下文
    var audioContext = new (window.AudioContext || window.webkitAudioContext)();
    var analyser = audioContext.createAnalyser();
    var source = audioContext.createMediaElementSource(currentAudio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    // 创建Canvas元素
    var canvas = document.getElementById("frequencySpectrum");
    var canvasCtx = canvas.getContext('2d');

    // 设置频谱参数
    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    // 绘制频谱
    function draw() {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
        var barWidth = (canvas.width / bufferLength) * 2.5;
        var barHeight;
        var x = 0;
        for (var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];
            canvasCtx.fillStyle = `rgb(${barHeight + 100},${barHeight + 100},${barHeight + 100})`;
            canvasCtx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
            x += barWidth + 1;
        }
    }

    // 开始绘制
    draw();
}
function showLastToast() {
    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    var toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl)
    })
    toastList[toastList.length - 1].show()
}
function loadJs(src) {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        script.type = "text/javascript";
        script.classList.add('dynaScri')
        script.src = src;
        document.body.appendChild(script);

        script.onload = () => {
            resolve();
        }
        script.onerror = () => {
            reject();
        }
    })
}
function findAncestorByClassName(element, className) {
    var ancestor = element;
    while (ancestor) {
        if (ancestor.classList.contains(className)) {
            return ancestor;
        }
        ancestor = ancestor.parentNode;
    }

    return null;
}
const tpl = `<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-animation="true" data-bs-autohide="false">
                            <div class="toast-header">
                                <img src="" class="rounded me-2" alt="">
                                <strong class="me-auto">{{msg}}</strong>
                                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                        </div>`;
/*
-- 
    <template v-for="(ele, i) in songArts">
        <a :href="'https://music.163.com/#/artist?id='+ele.i">{{el.n}}</a>{{songArts.length=0?"  /  ":""}}
    </template>
    
    */
const page = {
    template:`<div class="fixed-top d-flex justify-content-center align-item-center" style="width:100vw;height: 100vh;">
    <div class="d-flex justify-content-center align-items-center">
        <div class="spinner-border text-white spinner-border-xxl" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</div>`,
data(){
    return{

    }
}
}
const player = {
    template: `<div class="audio-player">
    <div class="audio-info">
    <div class="song-name">
    {{ songName }} 
    </div>
<div class="controlsrow">
    <div class="controls">
        <button class="play-pause" @click="togglePlay">
            <i class="playAndPause" :class="isPlaying ? 'ri-pause-fill' : 'ri-play-fill'"></i>
        </button>
    </div>
    <div class="progress-bar" :id="'bar'+songid" @mousedown.native="startDrag" @click.native="handleClick">
        <div class="progress" :style="{ width: progress + '%' }"></div>
        <div class="progress-handle" :style="{ left: progress + '%' }" @mousedown.native="startDrag"></div>
    </div>
    </div>
</div>

</div>
<link rel="stylesheet" href="/css/player.css">`,
    data() {
        return {
            audio: null,
            isPlaying: false,
            progress: 0,
            dragStartX: 0,
            dragStartProgress: 0
        };
    },
    props: {
        songName: {
            type: String,
            required: true
        },
        songPath: {
            type: String,
            required: true
        },
        songid: {
            type: Number,
            required: true
        },
        songArts: {
            type: Array,
            required: true
        }
    },
    mounted() {
        console.log(this.songName);
        this.audio = createAudio({
            songname: this.songName,
            src: this.songPath
        });
        this.audio.addEventListener('timeupdate', this.updateProgress);
        this.audio.addEventListener('ended', this.resetPlayer);

    },
    methods: {
        togglePlay() {
            if (this.isPlaying) {
                this.audio.pause();
            } else {

                pauseAllAudio(this.audio)
                audioSpectrum()
                // showPlaying()
                this.audio.play();
            }
            this.isPlaying = !this.isPlaying;
        },
        updateProgress() {
            const { currentTime, duration } = this.audio;
            this.progress = (currentTime / duration) * 100;
        },
        startDrag(event) {
            this.dragStartX = event.clientX;
            this.dragStartProgress = this.progress;
            document.addEventListener('mousemove', this.handleDrag);
            document.addEventListener('mouseup', this.stopDrag);
        },
        startBarDrag(event) {
            this.dragStartX = event.clientX;
            this.dragStartProgress = this.progress;
            document.addEventListener('mousemove', this.handleBar);
            document.addEventListener('mouseup', this.stopBarDrag);
        },
        handleDrag(event) {
            const deltaX = event.clientX - this.dragStartX;
            const progressBarWidth = document.getElementById(`bar${this.songid}`).offsetWidth;
            const progressDelta = (deltaX / progressBarWidth) * 100;
            this.progress = this.dragStartProgress + progressDelta;
            this.audio.currentTime = (this.progress / 100) * this.audio.duration;
        },
        handleBar(event) {
            const progressBarWidth = document.getElementById(`bar${this.songid}`).offsetWidth;
            const clickX = event.target.getBoundingClientRect().left;
            const progress = (clickX / progressBarWidth) * 100;
            this.progress = progress;
            this.audio.currentTime = (progress / 100) * this.audio.duration;
        },
        handleClick(event) {
            const progressBarWidth = document.getElementById(`bar${this.songid}`).offsetWidth;
            const clickX = event.clientX - event.target.getBoundingClientRect().left;
            const progress = (clickX / progressBarWidth) * 100;
            this.progress = progress;
            this.audio.currentTime = (progress / 100) * this.audio.duration;
        },
        stopDrag() {
            document.removeEventListener('mousemove', this.handleDrag);
            document.removeEventListener('mouseup', this.stopDrag);
        },
        stopBarDrag() {
            document.removeEventListener('mousemove', this.handleDrag);
            document.removeEventListener('mouseup', this.stopDrag);
        },
        resetPlayer() {
            this.isPlaying = false;
            this.progress = 0;
            this.audio.currentTime = 0;
        }
    }
}
const intropage = {
    template: `<link href="/next_index/dist/output.css" rel="stylesheet">
<link href="/next_index/css/custom.css" rel="stylesheet">
<script src="/js/src/smoove.min.js"><\/script>
<script src="/next_index/js/mmd-manual.js"><\/script>
<script src="/next_index/js/nav.js"><\/script>
<component :is="page"></component>
`,
    data() {
        return {
            page,
        }
    },
    methods: {

    },
    created() {
        fetch(`/next_index/src/indexcomp.html`).then(res => res.text()).then(respo => {
            this.page = {
                template: respo,
                data() {
                    return {
                        songs: {},
                        desc: "",
                        modal: {
                            songname: '',
                            desc: ''
                        },
                        temp: {

                        },
                        newsong: {
                            songname: '',
                            cover: '',
                            artists: {
                                name: '',
                                trueid: '',
                            },
                            desc: '',
                            audioshow: false,
                            audios: []
                        },
                        player: player,
                        curr: 0,
                    }
                },
                methods: {
                    glryClear() {
                        this.modal = {};
                        this.temp = {};
                    },
                    glryUpdate(i) {
                        console.log(i);
                        if (i === 0) {
                            document.querySelector("#newsongSec").scrollIntoView({
                                block: 'end',
                                behavior: 'smooth'
                            });
                        } else {
                            if (this.curr !== i) {
                                this.modal = {
                                    cover: this.songs[i].cover,
                                    songname: this.songs[i].name,
                                    artists: this.songs[i].artists,
                                    audioshow: false,
                                    audios: []
                                }
                                this.modal.desc = '加载中···'
                                fetch(`/getAlbum/${this.songs[i].trueid}`).then(r => r.json())
                                    .then(r => {
                                        this.modal = {
                                            cover: this.songs[i].cover,
                                            songname: this.songs[i].name,
                                            artists: this.songs[i].artists,
                                            audioshow: false,
                                            audios: []
                                        }
                                        this.temp = (r.resourceState == true) ? r : {}
                                        this.modal.desc = (r.resourceState == true) ? r.album.description : '__//\n获取失败，请稍后再试···\n- Diary Music -\n//__'
                                        for (let i = 0; i < r.songs.length; i++) {
                                            this.modal.audioshow = true;
                                            let arts = []
                                            for (let iar = 0; iar < r.songs[i].ar.length; iar++) {
                                                arts.push({
                                                    n: r.songs[i].ar[iar].name,
                                                    i: r.songs[i].ar[iar].id
                                                })
                                            }
                                            this.modal.audios.push({
                                                name: `#${i + 1}: ${r.songs[i].name}`,
                                                artists: arts,
                                                src: `getMp3/${r.songs[i].id}`,
                                            })
                                        }
                                    })
                                    .catch(e =>
                                        this.modal.desc = `__//\n获取失败，请稍后再试···\n错误代码：${e}\n- Diary Music -\n//__`
                                    )
                            }
                            $('#PlayerModal').modal('show')
                            this.curr = i
                        }
                    },
                },
                created() {
                    const scriptTags = document.querySelectorAll('.dynaScri');
                    scriptTags.forEach((tag) => {
                        tag.remove();
                    });

                },
                mounted() {
                    loadJs('/next_index/js/mmd-manual.js');
                    loadJs('/next_index/js/nav.js');
                    fetch('/get163', {
                        headers: {
                            'Content-Type': 'application/json;charset=utf8',
                            'Access-Control-Allow-Origin': '*',
                        }
                    }).then(d => d.json())
                        .then(d => {
                            this.newsong = {
                                name: '',
                                cover: '',
                                artists: {
                                    name: '',
                                    trueid: '',
                                },
                                desc: '',
                                audioshow: false,
                                audios: []
                            },
                                this.songs = (d.status = 200) ? ((d.data != undefined) ? d.data : {}) : {}
                            this.temp = (d.status = 200) ? ((d.data != undefined) ? d.data : {}) : {}
                            this.newsong = (d.status = 200) ? ((d.data != undefined) ? d.data[0] : {}) : {}
                            this.newsong.desc = '加载中···'
                            fetch(`/getAlbum/${this.songs[0].trueid}`).then(r => r.json())
                                .then(r => {
                                    this.temp = (r.resourceState == true) ? r : {}
                                    this.newsong.desc = (r.resourceState == true) ? r.album.description : '__//\n获取失败，请稍后再试···\n- Diary Music -\n//__';
                                    this.newsong.audios = []
                                    for (let i = 0; i < r.songs.length; i++) {
                                        this.newsong.audioshow = true;
                                        let arts = []
                                        for (let iar = 0; iar < r.songs[i].ar.length; iar++) {
                                            arts.push({
                                                n: r.songs[i].ar[iar].name,
                                                i: r.songs[i].ar[iar].id
                                            })
                                        }
                                        this.newsong.audios.push({
                                            songname: `#${i + 1}: ${r.songs[0].name}`,
                                            artists: arts,
                                            src: `getMp3/${r.songs[i].id}.mp3`,
                                        })
                                    }
                                })
                                .catch(e => {
                                    console.log(e);
                                    console.trace()
                                    this.newsong.desc = `__//\n获取失败，请稍后再试···\n错误代码：${e}\n- Diary Music -\n//__`
                                })
                        })
                },
            }
        })
    },
}
const home = {
    template: `
    <link rel="stylesheet" href="/css/home.css">
    <component :is="page"></component>
    `,
    data() {
        return {
            page,
        }
    },
    created() {
        fetch('/view/home/index.html').then(d => d.text()).then(d => {
            this.page = {
                template: d,
                data() {
                    return {
                        cont: null,
                        user: {
                            name: '未登录',
                            ava: '/uploads/uid_GUEST.png',
                            uid: '',
                        },

                        isLogin: false,
                        isAdmin: false
                    }
                },
                methods: {
                    logout() {
                        fetch('/logout').then(d => d.json()).then(d => localStorage.token = d.status == 200 ? d.token : undefined)

                        location.reload()
                        location.hash = '/login'
                    }
                },
                created() {
                    fetch('/getUserInfo', {
                        headers: { Token: localStorage.token }
                    }).then(d => d.json()).then(d => {
                        if (d.status == 200) {
                            var un = d.data.alia === null ? d.data.username : d.data.alia
                            this.user = {
                                name: un,
                                ava: d.data.avatar,
                                uid: d.data.id
                            }
                            this.isLogin = d.guest == 0
                            if (d.guest == 1)
                                setTimeout(() => {
                                    $(`<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-animation="true" data-bs-autohide="false">
                        <div class="toast-header">
                            <img src="" class="rounded me-2" alt="">
                            <strong class="me-auto">提示</strong>
                            <small class="text-muted time"></small>
                            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div class="toast-body">
                            建议您登录到Diary Music 官网来体验官网的完整功能。
                            <div class="mt-2 pt-2 border-top">
                                <a href="#/login" class="me-3">前往登录</a>
                            </div>
                        </div>
                    </div>`).appendTo('.toast-container')
                                    showLastToast()
                                    var time = 0
                                    $('.time').text(time + '秒前');
                                    setInterval(() => {
                                        time++
                                        if (time > 59) {
                                            $('.time').text(parseInt(time / 60) + '分钟前');
                                        } else {
                                            $('.time').text(time + '秒前');
                                        }
                                    }, 1000);
                                }, 1000);
                        }
                        else {
                            localStorage.setItem('token', d.token)
                            fetch('/getUserInfo', {
                                headers: { Token: localStorage.token }
                            }).then(d => d.json()).then(d => {
                                if (d.status == 200)
                                    var un = d.data.alia === null ? d.data.username : d.data.alia
                                this.user = {
                                    name: un,
                                    ava: d.data.avatar,
                                    uid: d.data.id
                                }
                                this.isLogin = d.guest == 0
                            })
                        }
                    })
                },
                mounted() {
                },
            }
        })
    },
};
const login = {
    template: `
    <link rel="stylesheet" href="/css/style.css">
    <component :is="page"></component>
    `,
    data() {
        return {
            page,
        }
    },
    created() {
        fetch('/view/login/index.html').then(d => d.text()).then(d => {
            this.page = {
                template: d,
                data() {
                    return {
                        flag: false,
                        em: '',
                        pw: '',
                        vf: '',
                    }
                },
                methods: {
                    eyeOnOff() {
                        if (!this.flag) {
                            $('#eyeInput').attr('type', 'text')
                            $('#eye').attr('class', 'ri-eye-line')
                            flag = true;
                        } else {
                            $('#eyeInput').attr('type', 'password')
                            $('#eye').attr('class', 'ri-eye-off-line')
                            flag = false;
                        }
                    },
                    sendVerf() {
                        if (this.em !== null)
                            fetch(`/sendCode/${this.em}`).then(d => d.json()).then(d => {
                                let dt = { msg: '发送失败' }
                                dt.msg = (d.status == 200) ? '发送成功' : '发送失败';
                                $(Handlebars.compile(tpl)(dt).toString()).appendTo('.toast-container')
                                showLastToast()
                            })
                    },
                    login() {
                        if (this.em.toString() !== '' && this.pw.toString() !== '' && this.vf.toString() !== '') {
                            let form = new FormData();
                            form.append('em', this.em)
                            form.append('pw', b64_sha256(this.pw))
                            form.append('vf', this.vf)

                            fetch('/login', {
                                method: 'post',
                                body: form
                            }).then(r => r.json()).then(r => {
                                let dt = { msg: '登录失败' }
                                dt.msg = (r.status == 200) ? `登录成功，登录有效期为${r.expires}` : '登录失败';
                                localStorage.setItem('token', r.token)
                                $(Handlebars.compile(tpl)(dt).toString()).appendTo('.toast-container')
                                showLastToast()
                                fetch('/verify', {
                                    headers: {
                                        'Token': localStorage.token
                                    }
                                })
                            }).catch(e => {
                                $(Handlebars.compile(tpl)({ msg: '登录失败' }).toString()).appendTo('.toast-container')
                                showLastToast()
                                console.error(e)
                            })
                        } else {
                            $(Handlebars.compile(tpl)({ msg: '登录失败（请勿留空信息）' }).toString()).appendTo('.toast-container')
                            showLastToast()
                        }
                    }
                },
                created() {

                },
                mounted() {
                },
            }
        })
    },
}
const regi = {
    template: `
    <link rel="stylesheet" href="/css/style.css">
    <component :is="page"></component>
    `,
    data() {
        return {
            page,
        }
    },
    created() {
        fetch('/view/register/index.html').then(d => d.text()).then(d => {
            this.page = {
                template: d,
                data() {
                    return {
                        flag: false,
                        em: '',
                        pw: '',
                        pww: '',
                        vf: '',
                    }
                },
                methods: {
                    eyeOnOff() {
                        if (!this.flag) {
                            $('#eyeInput').attr('type', 'text')
                            $('#eye').attr('class', 'ri-eye-line')
                            this.flag = true;
                        } else {
                            $('#eyeInput').attr('type', 'password')
                            $('#eye').attr('class', 'ri-eye-off-line')
                            this.flag = false;
                        }
                    },
                    sendVerf() {
                        if (this.em !== null)
                            fetch(`/sendCode/${this.em}`).then(d => d.json()).then(d => {
                                let dt = { msg: '发送失败' }
                                dt.msg = (d.status == 200) ? '发送成功' : '发送失败';
                                $(Handlebars.compile(tpl)(dt).toString()).appendTo('.toast-container')
                                showLastToast()
                            })
                    },
                    regi() {
                        if (this.em.toString() !== '' && this.pw.toString() !== '' && this.vf.toString() !== '' && this.pww.toString() !== '' && this.pww.toString() === this.pw.toString()) {
                            let form = new FormData();
                            form.append('em', this.em)
                            form.append('pw', b64_sha256(this.pw))
                            form.append('vf', this.vf)

                            fetch('/regi', {
                                method: 'post',
                                body: form
                            }).then(r => r.json()).then(r => {
                                let dt = { msg: '注册' }
                                dt.msg = (r.status == 200) ? `注册成功，此次登录有效期为${r.expires}` : '注册失败';
                                localStorage.setItem('token', r.token)
                                $(Handlebars.compile(tpl)(dt).toString()).appendTo('.toast-container')
                                showLastToast()
                                fetch('/verify', {
                                    headers: {
                                        'Token': localStorage.token
                                    }
                                })
                            }).catch(e => {
                                $(Handlebars.compile(tpl)({ msg: '注册失败' }).toString()).appendTo('.toast-container')
                                showLastToast()
                                console.error(e)
                            })
                        } else {
                            $(Handlebars.compile(tpl)({ msg: '注册失败（请勿留空信息）' }).toString()).appendTo('.toast-container')
                            showLastToast()
                        }
                    }
                },
                created() {

                },
                mounted() {
                },
            }
        })
    },
}
const homemain = {
    template: `
    <link rel="stylesheet" href="/css/style.css">
    <component :is="page"></component>
    `,
    data() {
        return {
            page,
        }
    },
    created() {
        fetch('/view/home/main.html').then(d => d.text()).then(d => {
            this.page = {
                template: d,
                data() {
                    return {

                    }
                },
                methods: {

                },
                created() {

                },
                mounted() {
                    document.querySelector('nav').classList.remove('sticky-top')
                    document.querySelector('nav').classList.add('fixed-top')
                },
            }
        })
    },
    beforeUnmount() {
        document.querySelector('nav').classList.add('sticky-top')
        document.querySelector('nav').classList.remove('fixed-top')
    },
}
const routes = [
    {
        path: '/',
        component: home,
        children: [
            {
                path: '/',
                component: homemain,
            },
            {
                path: 'login',
                component: login,
            },
            {
                path: 'register',
                component: regi,
            },
        ]
    },
    {
        path: '/intro',
        component: intropage,
    },
]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})
const app = Vue.createApp({}).use(router).mount('#app')