<?php
if($_POST){
	//二次验证
	@session_start();
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

	print_r($_POST);
	echo '提交成功';
}
?>