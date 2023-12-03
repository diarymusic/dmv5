const https = require('https');
const http = require('http')
const express = require('express');
const url = require('url');
const path = require('path');
const bodyParser = require('body-parser');//用于req.body获取值的
// var formidable = require('formidable');
const ajax = require("ajax-for-node")
// const mysql=require('mysql')
const fs = require('fs')

const app = express();

const routerApi=require("./APIs")
const port = 8084;
const ssl = 8085;

app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect('https://' + req.hostname + req.url);
    }
    next();
});
app.use(bodyParser.json());
app.use(routerApi)
// app.use(bodyParser.urlencoded({ extended: false }));
// 
app.use("/", express.static(path.join(__dirname, '/DiaryMusic/builded')));

// 启动服务器
const options={
    key:fs.readFileSync('./ssl/localhost.key'),
    cert:fs.readFileSync('./ssl/localhost.pem')
}
const httpsappl = https.createServer(options,app)
const httpappl = http.createServer(app)
const socketio = require('socket.io')
const {IncomingForm} = require("formidable");
const ws = socketio(httpsappl)
var wsPCCli = null
var wsMobCli = null
var sid = 0
function _wslogin(wsp,wsm,v,f){
    var ssid = f.ssid
    var token = f.token
    if(ssid.toString()===v.toString())
        wsp.emit('logined',token)
        wsm.emit('logined',token)
}
ws.on('connection',(ws)=>{

    ws.on('qrLogin',(ev)=>{
        let re = new RegExp('^DiaryMusicLoginSid_')
        let pm = new Promise((resolve, reject)=>{
            let sid = ev
            // if scan login
            if(re.test(atob(sid))){
                let s = atob(sid).split('DiaryMusicLoginSid_')[1]
                console.log(Date.now()-s)
                if(Date.now()-s>60000){
                    reject(s)
                    //   timeout in 1min
                }else{
                    resolve(s)
                }
            }
            //   end scan
        }).then(v=>{
            wsPCCli = ws
            sid = v
            /*app.post('/api/qrLogin',(req, res)=>{
                let form = new IncomingForm()
                form.parse(req,(e,f)=>{
                    if(!e){
                        var ssid = f.ssid
                        var token = f.token
                        if(ssid.toString()===v.toString())
                        ws.emit('logined',token)
                        res.status(200).json({status:200,code:0,msg:'success'})
                    }else{
                        res.status(500).json({status:500})
                    }
                })
            })*/
        }).catch(e=>{var errno = e;ws.emit('scanerror',1)})


    })
})
ws.on('connection',ws=>{
    wsMobCli = ws
    wsMobCli.on('sendtoken',ev=>{
        if(!!wsPCCli){
            _wslogin(wsPCCli,wsMobCli,sid,ev)
        }
    })
})



httpsappl.listen(ssl, () => {
    console.log(`Listening ssl :  ${ssl}`);
});
httpappl.listen(port,() => {
    console.log(`Listening port :  ${port}`);
})