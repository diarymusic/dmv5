# captcha

点选式验证码，前端js+后端php验证

![前端效果](https://images.gitee.com/uploads/images/2021/0820/170751_16ac7689_1402003.png "前端效果")

### 前端使用注意(Jq版)
1. 需加载jq，captcha.css，captcha.js
2. 表单内的提交按钮类型必须为 **button**类型，不能为 **submit** 类型，并且需要添加 **class** 值 **captcha_submit**

```
<form class="bform" method="post" action="form.php" onsubmit="return form_chk(this);">
  ...
  <button class="captcha_submit" type="button">提交</button>
</form>
```
表单的前端数据验证 form_chk() 根据自己实际项目去写

在这后面添加 js 代码
```
<script>
$('.bform').captcha({
  clicks: 3,
  url: 'captcha.php',
  tip: '请依次点击图中的',
  callback: function(){
    alert('表单提交');
  },
});
</script>
```

参数说明：
- clicks:  点选次数，此参数前后端设置需一致。最多能点选4次
- url:     验证码文件链接
- tip:     提示文本
- callback:  (验证成功后)表单提交前的执行函数

---

### 前端使用注意(原生js版)
1. 原生js，无依赖，需加载captcha.css，_captcha.pure.js_
2. 表单内的提交按钮类型必须为 **button**类型，不能为 **submit** 类型，并且需要添加 **class** 值 **captcha_submit**
3. _原生版的 `<form>` 标签只能用 id 选择器_
4. _原生版内部封装了原生 Ajax 方法，所有文件比较大_
```
<form id="bform" method="post" action="form.php" onsubmit="return form_chk(this);">
  ...
  <button class="captcha_submit" type="button">提交</button>
</form>
```
表单的前端数据验证 form_chk() 根据自己实际项目去写

在这后面添加 js 代码
```
<script>
new Captcha({
  el: '#bform',
  clicks: 3,
  url: 'captcha.php',
  tip: '请依次点击图中的',
  callback: function(){
    alert('表单提交');
  },
});
</script>
```

参数说明：
- clicks:  点选次数，此参数前后端设置需一致。最多能点选4次
- url:     验证码文件链接
- tip:     提示文本
- callback:  (验证成功后)表单提交前的执行函数

---

### 后端使用注意
#### captcha.php 调用代码
```
require_once('class/captcha/captcha.class.php');
$CA = new Captcha();
$CA->captcha(3);
```
---

#### form.php 后端验证
```
$captcha = $_POST['captcha'];
if(!$captcha){
    exit('缺少验证码');
}
require_once('class/captcha/captcha.class.php');
$CA = new Captcha();
$captcha_check = $CA->captcha_check($captcha, $_SESSION['captcha_poi']);
if(!$captcha_check){
    exit('验证码错误');
}
```

1. Captcha() 方法带1个参数，表示点选次数，此参数前后端需一致。最多能点4次
2. 根据自己的实际项目看需不需要修改路径
3. form.php 里的内容为提交到后端后的二次验证

---

### 其他说明
1. 背景所用到的素材来自 unsplash.com，Unsplash 上的所有图片都是由其创作者自愿免费分享出来，其他人无需经过允许即可任意使用。