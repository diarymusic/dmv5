<?php
session_start();
require_once str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']) . "/app/model/classes/classes.php";
header("charset=utf-8");
$id=$_GET['id'];
$url = 'https://music.163.com/api/album/'.$id.'?ext=true&id='.$id.'&offset=0&total=true&limit=1000';
echo file_get_contents($url);
?>