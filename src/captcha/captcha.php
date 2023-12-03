<?php
session_start();
require_once('class/captcha/captcha.class.php');
$CA = new Captcha();

$act = (isset($_POST['act']) && !empty($_POST['act'])) ? $_POST['act'] : null;
$ivalue = (isset($_POST['ivalue']) && !empty($_POST['ivalue'])) ? $_POST['ivalue'] : null;

if(!isset($act)){
	$act = 'img';
}

if($act=='img'){
	$CA->captcha(3);
	exit;
}elseif($act=='icon'){
	$captcha_icon = $CA->captcha_icon($_SESSION['captcha_icon']);
	$redata['captcha_icon'] = $captcha_icon;
	$json = json_encode($redata);
	echo $json;
	exit;
}elseif($act=='check'){
	$redata['check'] = $CA->captcha_check($ivalue, $_SESSION['captcha_poi']);
	$json = json_encode($redata);
	echo $json;
	exit;
}
?>