/*
 * author: ovsexia
 * version: 1.0.0
 * name: Jsajax
 * describe: 原生ajax封装
 * License: Mozilla Public License Version 2.0
 */

;function Ajax(config){
  let ajaxobj = new Object();
  ajaxobj = (function(ajaxobj){
    ajaxobj.type = config.type || 'GET';
    ajaxobj.url = config.url || '';
    ajaxobj.async = config.async || true;
    ajaxobj.data = config.data || null;
    ajaxobj.dataType = config.dataType || 'text';
    ajaxobj.contentType = config.contentType || 'application/x-www-form-urlencoded';
    ajaxobj.beforeSend = config.beforeSend || function(){};
    ajaxobj.success = config.success || function(){};
    ajaxobj.error = config.error || function(){};
    return ajaxobj;
  })(ajaxobj);

  ajaxobj.createxmlHttpRequest = function(){
    if(window.ActiveXObject){
      return new ActiveXObject('Microsoft.XMLHTTP');
    }else if(window.XMLHttpRequest){
      return new XMLHttpRequest();
    }
  };

  ajaxobj.convertData = function(data){
    if(typeof data === 'object'){
      let convertResult = '';
      for(let c in data){
        convertResult+= c + '=' + data[c] + '&';
      }
      convertResult = convertResult.substring(0, convertResult.length-1);
      return convertResult;
    }else{
      return data;
    }
  };

  ajaxobj.send = function(){
    let that = this;

    if(that.beforeSend && typeof(that.beforeSend)==='function'){
      that.beforeSend();
    }

    let xhr = that.createxmlHttpRequest();
    xhr.responseType = that.dataType;
    xhr.open(that.type, that.url, that.async);
    xhr.setRequestHeader('Content-Type', that.contentType);
    xhr.send(that.convertData(that.data));
    xhr.onreadystatechange = function(){
      if (xhr.readyState == 4){
        if(xhr.status == 200){
          that.success(xhr.response);
        }else{
          that.error(xhr.response);
        }
      }
    }
  };
  return ajaxobj;
}


/*
 * author: ovsexia
 * version: 1.3.0
 * name: Captcha
 * describe: 点选验证码插件
 * License: Mozilla Public License Version 2.0
 */

;function Captcha(config){
  //默认参数
  const defaluts = {
    el: '',
    clicks: 3,
    url: null,
    tip: '请依次点击图中的',
    callback: null,
  };

  let captcha = new Object();
  captcha = (function(captcha){
    captcha.config = {};
    if(!config.el){
      return false;
    }
    let firpre = config.el.substr(0, 1);
    if(firpre === '#'){
      config.el = config.el.substr(1);
    }
    captcha.config.el = config.el;
    captcha.form = document.getElementById(config.el) || null;
    if(!captcha.form){
      console.log('%c%s', 'color:red', 'Error: 元素不存在');
      return false;
    }
    let input = document.createElement('input');
    input.name = 'captcha';
    input.type = 'hidden';
    captcha.input = document.getElementById(config.el).appendChild(input);
    captcha.button = captcha.form.getElementsByClassName('captcha_submit')[0] || null;
    if(!captcha.button){
      console.log('%c%s', 'color:red', 'Error: 提交按钮未添加 className: "captcha_submit"');
      return false;
    }

    captcha.config.clicks = config.clicks ? config.clicks : defaluts.clicks;
    captcha.config.url = config.url ? config.url : defaluts.url;
    captcha.config.tip = config.tip ? config.tip : defaluts.tip;
    captcha.config.callback = config.callback ? config.callback : defaluts.callback;
    captcha.cindex = 0;
    captcha.poi = [];
    captcha.config.poisize = 28;

    captcha.button.addEventListener('click', function(){
      captcha.show();
    });
    return captcha;
  })(captcha);

  //显示验证码
  captcha.show = function(){
    let that = this;
    let chtml = document.createElement('div'); //xcaptcha xon
    chtml.className = 'xcaptcha xon';
    chtml.innerHTML = '<div class="xcaptcha_bg"></div>\
      <div class="xcaptcha_in">\
        <div class="xcaptcha_box">\
          <div class="xcaptcha_imgbox"><img class="xcaptcha_img" /><div class="xcaptcha_cover"></div></div>\
          <div class="xcaptcha_p">\
            <p>'+that.config.tip+': <span class="xcaptcha_span">...</span></p>\
            <span class="xcaptcha_rebtn"><span class="xcaptcha_rebtnin"><span class="xcaptcha_rebtnint"></span><span class="xcaptcha_rebtninb"></span></span></span>\
          </div>\
        </div>\
      </div>';
    document.body.appendChild(chtml);
    that.maindiv = chtml;

    that.img = that.maindiv.getElementsByClassName('xcaptcha_img')[0];

    //绑定关闭验证码
    that.bg = that.maindiv.getElementsByClassName('xcaptcha_bg')[0];
    that.bg.addEventListener('click', function(){
      that.close();
    });

    //绑定刷新验证码
    that.rebtn = that.maindiv.getElementsByClassName('xcaptcha_rebtn')[0];
    that.rebtn.addEventListener('click', function(){
      that.refresh();
    });

    //绑定点选
    that.imgbox = that.maindiv.getElementsByClassName('xcaptcha_imgbox')[0];
    that.imgbox.addEventListener('click', function(e){
      that.csubmit(e);
    });

    that.span = that.maindiv.getElementsByClassName('xcaptcha_span')[0];

    that.refresh();
  };

  //开始点选
  captcha.csubmit = function(e){
    let that = this;

    if(that.imgbox.getElementsByClassName('xcaptcha_alert')[0]){
      return false;
    }

    let x = e.offsetX - (that.config.poisize / 2);
    let y = e.offsetY - (that.config.poisize / 2);
    let poi = (e.offsetX*2)+'-'+(e.offsetY*2);  //提交中心点坐标，x2倍避免移动端不够清晰
    that.poi.push(poi);
    that.cindex++;

    let phtml = document.createElement('div');
    phtml.innerHTML = '<p>'+that.cindex+'</p>';
    phtml.className = 'xcaptcha_poi';
    phtml.style.width = that.poisize+'px';
    phtml.style.height = that.poisize+'px';
    phtml.style.top = y+'px';
    phtml.style.left = x+'px';
    phtml.style.width = that.config.poisize+'px';
    phtml.style.height = that.config.poisize+'px';
    that.imgbox.appendChild(phtml);

    if(that.cindex === that.config.clicks){
      let ivalue = that.config.poisize + '||' + that.poi.join(',');
      that.load();
      let myajax = new Ajax({
        type: 'post',
        url: that.config.url,
        data: {'act':'check', 'ivalue':ivalue},
        dataType: 'json',
        success: function(data){
          if(data.check){
            that.input.value = ivalue;
            if(that.config.callback && typeof(that.config.callback)=='function'){
              that.config.callback();
            }
            if(document.getElementById(that.config.el).onsubmit){
              let onsubmit = document.getElementById(that.config.el).onsubmit(this);
              if(onsubmit === false){
                that.close();
                return false;
              }
            }
            document.getElementById(that.config.el).submit();
            that.close();
          }else{
            that.loadClose();
            that.error('Captcha is wrong', function(){
              that.refresh();
            });
          }
        }
      });
      myajax.send();
    }
  };

  //反馈
  captcha.alert = function(type, msg, call){
    let that = this;
    let alert = document.createElement('div');
    alert.className = 'xcaptcha_alert';
    let alert_html = '<div class="xcaptcha_alertin">';
    if(type=='error'){
      alert_html += '<p class="xcaptcha_error"><i class="icaptcha-error"></i> '+msg+'</p>';
    }else if(type=='load'){
      alert_html += '<p class="xcaptcha_load"><span></span><span></span><span></span></p>';
    }
    alert_html += '</div>';
    alert.innerHTML = alert_html;
    that.imgbox.appendChild(alert);
    if(that.imgbox.getElementsByClassName('xcaptcha_error').length > 0){
      that.imgbox.getElementsByClassName('xcaptcha_error')[0].className = 'xcaptcha_error xon';
    }
    if(type=='error'){
      setTimeout(function(){
        that.imgbox.getElementsByClassName('xcaptcha_alert')[0].className = 'xcaptcha_alert xout';
        setTimeout(function(){
          that.loadClose();
          if(call && typeof(call)=='function'){
            call();
          }
        }, 201);
      }, 1500);
    }
  };

  //加载中
  captcha.load = function(){
    let that = this;
    return that.alert('load');
  };

  //关闭加载中
  captcha.loadClose = function(){
    let that = this;
    let alert = that.imgbox.getElementsByClassName('xcaptcha_alert')[0];
    if(alert){
      alert.remove();
    }
  };

  //错误反馈
  captcha.error = function(msg, call){
    let that = this;
    that.loadClose();
    return that.alert('error', msg, call);
  };

  //刷新验证码
  captcha.refresh = function(){
    let that = this;

    if(that.imgbox.getElementsByClassName('xcaptcha_alert')[0]){
      return false;
    }

    that.cindex = 0;
    that.poi = [];
    that.span.innerHTML = '...';
    let xcaptcha_poi = that.maindiv.getElementsByClassName('xcaptcha_poi') || null;
    if(xcaptcha_poi.length > 0){
      let poiarr = [];
      for(let i=0; i<xcaptcha_poi.length; i++){
        poiarr.push(xcaptcha_poi[i]);
      }
      for(let i=0; i<poiarr.length; i++){
        poiarr[i].remove();
      }
    }
    let oldsrc = that.img.src;
    if(!oldsrc){
      oldsrc = that.config.url;
    }
    let arr = oldsrc.split('?code');
    const newsrc = arr[0]+'?code='+Math.random();
    that.img.src = newsrc;

    //获取顺序
    that.load();
    let imgs = new Image();
    imgs.src = newsrc;
    imgs.onload = function(){
      let myajax = new Ajax({
        type: 'post',
        url: that.config.url,
        data: {'act': 'icon'},
        dataType: 'json',
        success: function(data){
          that.loadClose();
          let captcha_icon = data.captcha_icon;
          let captcha_icon_html = '';
          for(let i=0; i<captcha_icon.length; i++){
            captcha_icon_html += '<i class="icaptcha-'+captcha_icon[i]+'"></i>';
          }
          that.span.innerHTML = captcha_icon_html;
        }
      });
      myajax.send();
    };
    return false;
  };

  //关闭验证码
  captcha.close = function(){
    let that = this;
    this.maindiv.remove();
  };
  return captcha;
}