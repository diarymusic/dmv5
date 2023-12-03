'use strict'
const https = require('https');
const http = require('http')
const url = require('url');
const fs = require('fs');
const fetch = require('node-fetch')
const mysql = require('mysql')
const mailer = require('nodemailer')
const formidable = require('formidable');
const jwt = require('jsonwebtoken')
const bs64 = require('./src/js/src/crypt/sha256')
// const vue = require('vue')
const handlebars = require('handlebars')
const express = require('express');
const { reject } = require('lodash');
const { resolve } = require('path');
const { Exception } = require('handlebars');
const {qrcode} = require('qrcode-generator')
const router = express.Router()

/*
https://music.163.com/song/media/outer/url?id=id.mp3
http://music.163.com/api/song/detail/?id={歌曲ID}&ids=%5B{歌曲ID}%5D
http://music.163.com/api/album/{{歌曲ID}}?ext=true&id={{歌曲ID}}&offset=0&total=true&limit=10
https://wyy01.sout.eu.org/song/detail?ids=1977503185
*/
const transporter = mailer.createTransport({
    service: 'outlook',
    host: "smtp-mail.outlook.com",
    port: 587,
    requireTLS: true,
    auth: {
        user: "diarymusic@outlook.com",
        pass: "Diary20230119",
    },
});
const _TOKENSECRET = '123456'
const _TOKENEXPS = '240h'

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'diarymusicoffi_c',
    port: 3306,
    charset: "utf8",
});
function generateGuestToken(){
    return jwt.sign({
        acc: 'GUEST',
        psw: 'GUEST',
    }, _TOKENSECRET, {
        expiresIn: _TOKENEXPS
    })
}
 // 用于存储IP地址的集合

router.use((req, res, next) => {
    const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
    const data = JSON.parse(fs.readFileSync('ips.json'));

    if (data.includes(ip)) {
        console.log(`IP ${ip} 已存在，跳过写入操作。`);
        next();
    } else {
        console.log(`记录IP ${ip} 到文件。`);
        data.push(ip);
        fs.writeFileSync('ips.json', JSON.stringify(data, null, 2));
        next();
    }
});

router.get('/api/get163', (req, res) => {
    fetch('https://music.163.com/api/artist/albums/55799880?id=55799880&offset=0&total=true&limit=1000').then(d => d.json()).then(respo => {
        var data = [];
        var infoKey;
        respo.hotAlbums.forEach((v, k) => {
            var artistsList = [];
            v.artists.forEach((v, k) => {
                artistsList.push({
                    "id": k + 1,
                    "name": v.name,
                    "trueid": v.id
                })
            });
            var info = {
                "id": k,
                "trueid": v.id,
                "name": v.name,
                "cover": v.picUrl,
                "link": `https://music.163.com/#/album?id=${v.id}`,
                "artists": artistsList,
            };
            data.push(info)
            infoKey = k
        });
        //
        data.push({
            'id': infoKey + 1,
            'name': 'Polyhedron',
            'trueid': 160270134,
            'cover': 'http://p1.music.126.net/NUKMB7jMao1t3pD48k6d_Q==/109951168316320824.jpg',
            'artists': [
                {
                    "id": 1,
                    "name": "Attic",
                    "trueid": "55757190",
                },
                {
                    "id": 2,
                    "name": "SeynChild",
                    "trueid": "34344820",
                },
                {
                    "id": 3,
                    "name": "Diary Music",
                    "trueid": "55799880",
                },
            ],
            "link": 'https://music.163.com/#/album?id=160270134',
        })
        res.status(200).json({
            "status": 200,
            "data": data,
        })
    }).catch(e => res.status(500).json({
        'status': 500,
        'msg': `Internal Server Error :${e}`
    }))
});

router.get("/api/getAlbum/:id", (req, res) => {
    if (req.params.id != undefined) {
        var albumId = req.params.id;
        fetch(`https://wyy01.sout.eu.org/album/?id=${albumId}`).then(d => d.json()).then(respo => {
            res.status(200).send(respo)
        }).catch(e => res.status(500).json({
            'status': 500,
            'msg': `Internal Server Error :${e}`
        }))
    } else {
        res.status(404).json({
            "status": 404,
            "msg": "No Id"
        })
    }
});

router.get("/api/getMp3/:filename", (req, res) => {
    console.log(req.params.filename);
    if (req.params.filename != undefined) {
        fetch(`https://music.163.com/song/media/outer/url?id=${req.params.filename}`, {
            follow: 1
        }).then(res => res.buffer()).then(cdn => {
            console.log(cdn.headers);
            res.set('Content-Type', 'audio/mpeg');
            res.set('Accept-Ranges', 'bytes');
            res.send(cdn)
        }).catch(e => {
            console.log(e);
            res.status(500).json({ status: 500, msg: e })
        })
    } else {
        res.status(404)
    }
})

router.post('/api/verify', (req, res) => {
    let form = new formidable.IncomingForm()
    var verf = Math.floor(Math.random() * 900000) + 100000;
    form.parse(req,(e,fl)=>{
        return new Promise((resolve,reject)=>{
            if(!e){
                if(fl.em.toString()===''||fl.vf.toString()==='') resolve(2)
                else
                db.query('SELECT `verf` FROM `uids` WHERE ?',{acc:fl.em},(er,d)=>{
                    if(!e){
                        if(d[0].verf.toString()===fl.vf.toString()) {
                            db.query('UPDATE `uids` SET ?',{
                                vfst:1
                            },(e)=>{
                                if(!e) {
                                    db.query('UPDATE `uids` SET ? WHERE ?', [
                                        {
                                            verf
                                        },
                                        {
                                            acc: fl.em
                                        }
                                    ], (e) => {
                                        if (!e)
                                                resolve(0)
                                        else throw ''
                                    })

                                }
                                else resolve(1)
                            })
                        }
                    }else resolve(1)
                })
            }else resolve(1)
        }).then(val=>{
            res.json({
                status:200,
                code:val,
            })
        })
    })
})
router.get('/api/sqltest/:id', (req, res) => {

})
router.post('/api/login', (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req,(err, field, file) => {
        if (!err) {
            db.query('SELECT * FROM `uids` WHERE ?', { acc: field.em }, (e, d, f) => {
                if (!e) {
                    var verf = Math.floor(Math.random() * 900000) + 100000;
                    try {
                        if (d[0].password === field.pw.toString() && d[0].verf.toString() === field.vf.toString() && d[0].ban.toString()==='0') {
                            // 验证密码成功
                            var token = jwt.sign({
                                acc: d[0].acc.toString(),
                                psw: d[0].password.toString()
                            }, _TOKENSECRET, {
                                expiresIn: _TOKENEXPS
                            })
                            res.json({
                                status: 200,
                                msg: 'ok',
                                token,
                                expires: _TOKENEXPS
                            })
                            db.query('UPDATE `uids` SET ? WHERE ?', [
                                {
                                    verf
                                },
                                {
                                    acc: field.em
                                }
                            ], (e) => {
                            })
                        } else {
                            res.status(401).json({
                                status: 401, token: generateGuestToken()
                            })
                        }
                    } catch (error) {
                        res.status(402).json({
                            status: 401, token: generateGuestToken()
                        })
                    }
                } else {
                    res.status(403).json({
                        status: 401, token: generateGuestToken()
                    })
                }
            })

        }else{
            res.status(500).json({
                status:500,token:generateGuestToken()
            })
        }
    })
})
router.post('/api/register', async (req, res) => {
    let form = new formidable.IncomingForm();
    var st1 = false;
    var st2 = false;
    var code = 0;
    var verf = Math.floor(Math.random() * 900000) + 100000;
    // 1 系统错误
    // 2 邮箱存在
    // 3 用户名存在
    function _reg(err, field, file) {
        return new Promise((resolve, reject) => {
            if (!err) {
                db.query('SELECT `acc`, `username` FROM `uids` WHERE ? ', {
                    acc: field.em
                }, (e0, d0) => {
                    if (!e0) {
                        if (!d0.length == 0)  reject(2)
                        else
                        db.query('SELECT `acc`, `username` FROM `uids` WHERE ? ', {
                            username: field.un
                        }, (e0, d0) => {
                            if (!e0) {
                                if (!d0.length == 0) reject(3)
                                else resolve();
                            } else reject(1);
                        });
                    } else reject(1);
                });
            } else reject(1);

        }).then(val=>{
            return new Promise((resolve,reject)=>{
                db.query('INSERT INTO `uids` (`acc`,`username`,`password`,`avatar`,`verf`) VALUES (? , ? , ? , ?,?) ', [
                    field.em,
                    field.un,
                    field.pw,
                    field.ap,
                    verf,
                ], (e, d, f) => {
                    if (!e) {
                        try {
                            res.status(200).json({
                                status: 200, token: jwt.sign({
                                    acc: field.em,
                                    psw: field.pw,
                                    vco: verf,
                                }, _TOKENSECRET, {
                                    expiresIn: _TOKENEXPS
                                }),
                                expires:_TOKENEXPS,
                                code:0
                            });
                            resolve(false);
                        } catch (error) {
                            reject(1);
                        }
                    } else {
                        reject(1);
                    }
                });
            })
        });
    }

    try {
        const result = await new Promise((resolve, reject) => {
            form.parse(req, (err, field, file) => {
                console.log('err'+err)
                let co =_reg(err, field, file)
                resolve(co);
            });
        });
        console.log("result"+result)
        if (result) {
            res.status(500).json({
                status: 500,
                code: result,
                token: generateGuestToken()
            });
        }
    } catch (error) {
        console.log('error'+error);
        res.status(500).json({
            status: 500,
            code: error,
            token: generateGuestToken()
        });
    }
});
 router.get('/api/test',(req,res)=>{
    res.status(200).json({
        status:200,
        msg:'ok'
    })
})
async function sendcode({ em, code }) {
    fs.readFile('./src/view/verifyCode/index.html', async (e, d) => {
        if (!e) {
            let html = handlebars.compile(d.toString())({ code })
            const info = await transporter.sendMail({
                from: '"Diary Music" <diarymusic@outlook.com>', // sender address
                to: em, // list of receivers
                subject: "Diary Music 验证码 ✔", // Subject line// plain text body
                text: `你好!你的Diary Music验证码为： ${code}`,
                html, // html body
            });
            if (info.accepted.length > 0 && info.rejected.length == 0) {
                resolve()
            }
            // console.log(info);
        } else {
            reject(e)
        }
    })
}
router.get('/api/sendCode/:em', (req, res) => {
    let em = req.params.em
    try {
        if (em != undefined) {
            let verf = Math.floor(Math.random() * 900000) + 100000;
            db.query('SELECT `verf` FROM `uids` WHERE ?', { acc: em }, (e, data, f) => {
                if (!e && data.length != 0)
                    db.query('UPDATE `uids` SET ? WHERE ?', [
                        {
                            verf
                        },
                        {
                            acc: em
                        }
                    ], (e) => {
                        if (!e)
                            sendcode({ em, code: verf }).then(res.status(200).json({ status: 200 }))
                        else throw ''
                    })
                else throw ''
            })
        } else throw ''
    } catch (e) {
        res.status(404).json({ status: 404 })
    }
})
router.get('/api/getUserInfo', (req, res) => {
    try {
        let token = jwt.verify(req.headers.token.toString(), _TOKENSECRET)
        if (token != 'undefined')

            db.query('SELECT * FROM `uids` WHERE ?', {
                acc: token.acc.toString(),
            }, (e, d, f) => {
                if (!e) {
                    if (d[0] != undefined)
                        if (token.psw.toString() === d[0].password)
                            db.query('SELECT `id`, `acc`,`username`, `alia`, `avatar`,`permission`,`ban`,`vfst` FROM `uids` WHERE ?', [
                                {
                                    acc: token.acc.toString()
                                }
                            ], (e, d, f) => {
                                if (!e) {
                                    let isAdmin = 0;
                                    switch(d[0].permission.toString()){
                                        case'99':isAdmin=1;break;
                                        case'0':isAdmin=0;break;
                                    }
                                    if (d[0].ban.toString() == '0') {
                                        if (d[0].vfst.toString() === '1') {
                                            res.status(200).json({
                                                status: 200,
                                                guest: token.acc.toString() === 'GUEST' ? 1 : 0,
                                                data: d[0],
                                                isAdmin,
                                                verified: true,
                                            });
                                        } else {
                                            res.status(200).json({
                                                status: 200,
                                                guest: token.acc.toString() === 'GUEST' ? 1 : 0,
                                                data: d[0],
                                                isAdmin,
                                                verified: false,
                                            });
                                        }
                                    } else {
                                        res.status(404).json({
                                            status: 404,
                                            guest: 1,
                                            data: {},
                                            verified: false,
                                        })
                                    }
                                }else {
                                    res.status(404).json({
                                        status: 404,
                                        guest: 1,
                                        data: {},
                                        verified: false,
                                    })
                                }
                            })
                        else throw 'invalid password'
                    else throw 'invalid acc'
                } else throw e
            })
        else throw 'token not found'
    } catch (e) {
        console.log(e.toString());
        res.status(200).json({ status: 404, guest: 1 ,token: generateGuestToken()})
    }
})
router.get('/api/logout', (req, res) => {
    var verf = Math.floor(Math.random() * 900000) + 100000;
    let token = jwt.verify(req.headers.token.toString(), _TOKENSECRET)
    db.query('UPDATE `uids` SET ? WHERE ?', [
        {
            verf
        },
        {
            acc: token.acc.toString()
        }
    ], (e,d) => {
        res.json({
            status: 200,
            token: generateGuestToken()
        })
    })

})
module.exports = router;