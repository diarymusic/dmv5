import {useRouter} from 'vue-router'
const router= useRouter()
export const _DEFAULTUSERINFO={
    name: '未登录',
    ava: 'res/default.png',
    uid: '',
}
export async function getMyInfoByToken(){

    return new Promise((resolve,reject)=>{
        var user = _DEFAULTUSERINFO;
        var isLogin = false;
        var isAdmin = false;
        function _process(d){

            // console.log(d)
            if (d.status === 200) {
                var un = d.data.alia === null ? d.data.username : d.data.alia
                user = {
                    name: un,
                    ava: d.data.avatar,
                    uid: d.data.id
                }
                isLogin = d.guest === 0
                isAdmin = d.isAdmin
                if (d.guest === 1) {
                    reject(0)
                }else{
                    resolve({
                        user,
                        isLogin,
                        isAdmin,
                    })
                }
            }
        }
        fetch('/api/getUserInfo', {
            headers: { Token: localStorage.token }
        }).then(d => d.json()).then(d=>_process(d)).catch(e=>{fetch('/api/getUserInfo', {
            headers: { Token: localStorage.token }
        }).then(d=>_process(d))})
    })
}

export function notify({title,body}){
        function _create(arg){
            return new Promise((resolve, reject)=>{
                try{
                    const notification = new Notification(arg.title, {
                        lang: 'zh-cn',
                        body:arg.body,
                        icon: './favicon.ico',
                        tag: 'dmNotify',
                        renotify: true,
                        actions: [],
                    });
                    notification.addEventListener('click',()=>{
                        resolve()
                    })
                }catch(e){
                    reject(arg)
                }
            })
        }
        var arg={title,body}
        return new Promise((resolve, reject)=>{
            if (!("Notification" in window)) {
                reject(0)
            } else if (Notification.permission === "granted") {
                _create(arg).then(resolve(0)).catch(reject(arg))
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission().then((permission) => {
                    if (permission === "granted") {
                        _create(arg).then(resolve(0)).catch(reject(arg))
                    }else{
                        reject(arg)
                    }
                });
            }else{
                reject(arg)
            }
        });
}