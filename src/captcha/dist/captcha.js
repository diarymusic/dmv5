/*
 * author: ovsexia
 * version: 1.3.0
 * name: Captcha
 * describe: 点选验证码插件
 * License: Mozilla Public License Version 2.0
 */

(function($){
  let Captcha = function(form, config){
    let that = this;

    that.config = config;
    if(!that.config.url){
      return false;
    }
    that.cindex = 0;
    that.poi = new Array();
    that.poisize = 28;  //点选圈大小
    that.form = $(form);
    that.form.append('<input type="hidden" name="captcha" />');
    that.input = that.form.find('input[name="captcha"]');

    if(that.form.length == 0){
      return false;
    }

    that.button = that.form.find('.captcha_submit');
    if(that.button.length == 0){
      console.log('%c%s', 'color:red', 'Error: 提交按钮未添加 className: "captcha_submit"');
      return false;
    }
    that.button.on('click', {}, function(e){
      that.show();
    });
  };

  Captcha.pt = Captcha.prototype;

  //显示验证码
  Captcha.pt.show = function(){
    let that = this;
    chtml = '<div class="xcaptcha xon">\
      <div class="xcaptcha_bg"></div>\
      <div class="xcaptcha_in">\
        <div class="xcaptcha_box">\
          <div class="xcaptcha_imgbox"><img class="xcaptcha_img" src="" /><div class="xcaptcha_cover"></div></div>\
          <div class="xcaptcha_p">\
            <p>'+that.config.tip+': <span class="xcaptcha_span">...</span></p>\
            <span class="xcaptcha_rebtn"><span class="xcaptcha_rebtnin"><span class="xcaptcha_rebtnint"></span><span class="xcaptcha_rebtninb"></span></span></span>\
          </div>\
        </div>\
      </div>\
    </div>';
    $('body').append(chtml);
    that.captcha = $('.xcaptcha');

    that.img = that.captcha.find('.xcaptcha_img');

    //绑定关闭验证码
    that.bg = that.captcha.find('.xcaptcha_bg');
    that.bg.on('click', {}, function(e){
      that.close();
    });

    //绑定刷新验证码
    that.rebtn = that.captcha.find('.xcaptcha_rebtn');
    that.rebtn.on('click', {}, function(e){
      that.refresh();
    });

    //绑定点选
    that.imgbox = that.captcha.find('.xcaptcha_imgbox');
    that.imgbox.on('click', {}, function(e){
      that.csubmit(e);
    });

    that.span = that.captcha.find('.xcaptcha_span');

    that.refresh();
  };

  //开始点选
  Captcha.pt.csubmit = function(e){
    let that = this;

    if(that.imgbox.find('.xcaptcha_alert').length > 0){
      return false;
    }

    let x = e.offsetX - (that.poisize / 2);
    let y = e.offsetY - (that.poisize / 2);
    let poi = (e.offsetX*2)+'-'+(e.offsetY*2);  //提交中心点坐标，x2倍避免移动端不够清晰
    that.poi.push(poi);
    that.cindex++;

    phtml = '<div class="xcaptcha_poi" style="width:'+that.poisize+'px; height:'+that.poisize+'px; top:'+y+'px; left:'+x+'px"><p>'+that.cindex+'</p></div>';
    that.imgbox.append(phtml);

    if(that.cindex==that.config.clicks){
      let ivalue = that.poisize + '||' + that.poi.join(',');
      that.load();
      $.ajax({
        type: 'post',
        url: that.config.url,
        data: {'act':'check', 'ivalue':ivalue},
        dataType: 'json',
        success: function(data){
          if(typeof(data)=='string'){
            data = $.parseJSON(data);
          }
          if(data.check){
            that.input.val(ivalue);
            if(that.config.callback && typeof(that.config.callback)=='function'){
              that.config.callback();
            }
            $(that.form.get(0)).submit();
            that.close();
          }else{
            that.loadClose();
            that.error('Captcha is wrong', function(){
              that.refresh();
            });
          }
        }
      });
    }
  };

  //反馈
  Captcha.pt.alert = function(type, msg, call){
    let that = this;
    alert_html = '<div class="xcaptcha_alert"><div class="xcaptcha_alertin">';
    if(type=='error'){
      alert_html += '<p class="xcaptcha_error"><i class="icaptcha-error"></i> '+msg+'</p>';
    }else if(type=='load'){
      alert_html += '<p class="xcaptcha_load"><span></span><span></span><span></span></p>';
    }
    alert_html += '</div></div>';
    that.imgbox.append(alert_html);
    that.imgbox.find('.xcaptcha_error').addClass('xon');
    if(type=='error'){
      setTimeout(function(){
        that.imgbox.find('.xcaptcha_alert').fadeOut(200, function(){
          $(this).remove();
          if(call && typeof(call)=='function'){
            call();
          }
        });
      }, 1500);
    }
  };

  //加载中
  Captcha.pt.load = function(){
    let that = this;
    return that.alert('load');
  };

  //关闭加载中
  Captcha.pt.loadClose = function(){
    let that = this;
    that.imgbox.find('.xcaptcha_alert').remove();
  };

  //错误反馈
  Captcha.pt.error = function(msg, call){
    let that = this;
    that.loadClose();
    return that.alert('error', msg, call);
  };

  //刷新验证码
  Captcha.pt.refresh = function(){
    let that = this;

    if(that.imgbox.find('.xcaptcha_alert').length > 0){
      return false;
    }

    that.cindex = 0;
    that.poi = [];
    that.span.html('...');
    that.captcha.find('.xcaptcha_poi').remove();
    oldsrc = that.img.attr('src');
    if(!oldsrc){
      oldsrc = that.config.url;
    }
    arr = oldsrc.split('?code');
    newsrc = arr[0]+'?code='+Math.random();
    that.img.attr('src', newsrc);

    //获取顺序
    that.alert('load');
    imgs = new Image();
    imgs.src = newsrc;
    imgs.onload = function(){
      $.ajax({
        type: 'post',
        url: that.config.url,
        data: {'act':'icon'},
        dataType: 'json',
        success: function(data){
          if(typeof(data)=='string'){
            data = $.parseJSON(data);
          }
          that.loadClose();
          captcha_icon = data.captcha_icon;
          captcha_icon_html = '';
          for(let i=0; i<captcha_icon.length; i++){
            captcha_icon_html += '<i class="icaptcha-'+captcha_icon[i]+'"></i>';
          }
          that.span.html(captcha_icon_html);
        }
      });
    };
    return false;
  };

  //关闭验证码
  Captcha.pt.close = function(){
    let that = this;
    that.captcha.removeClass('xon');
    that.captcha.remove();
  };

  $.fn.extend({
    'captcha': function(options){
      let opts = $.extend({}, defaluts, options);
      this.each(function () {
        let $this = $(this);
        C = new Captcha($this, opts);
        return C;
      });
    },
  });

  //默认参数
  let defaluts = {
    clicks: 3,
    url: null,
    tip: '请依次点击图中的',
    callback: null,
  };
})(window.jQuery);