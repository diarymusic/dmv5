<?php
session_start();
require_once str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']) . "/app/model/classes/classes.php";
header("Content-type: text/html; charset=utf-8");
if(isset($_POST['bs'])&&isset($_POST['to'])){
$dsql=new dSql;
$dsql->bind('UPDATE `uids` SET `avatar`=? WHERE `token`= ?','ss',$_POST['bs'],$_POST['to']);
echo json_encode(array(
    'status'=>'200'
));
}
