<?php
session_start();
require_once str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']) . "/app/model/classes/classes.php";
header("charset=utf-8");
$url = 'https://www.beatarray.com/api/submit/labelAuditGetSubmits?page=1&pageSize=1000&sortKey=createdTime&sortMethod=-1&labelId=263';
echo file_get_contents($url);