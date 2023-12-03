<?php
session_start();
function loginWarn(){
    echo json_encode(array('status'=>'404'),JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
}
$_SESSION['ls']=(isset($_SESSION['ls']))?$_SESSION['ls']:0;
$_SESSION['ad']=(isset($_SESSION['ad']))?$_SESSION['ad']:0;

$_SESSION['ls']=1;
$_SESSION['ad']=1;
if($_SESSION['ls']==1&&$_SESSION['ad']==1){
require_once str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT'])."/app/model/classes/classes.php";
header("Content-type: text/html; charset=utf-8");

if($_GET['id']&&!($_GET['id']==-1)){
    $dsql = new dSql;

    $sql="SELECT * FROM uids WHERE `id`=?";
    $res = $dsql->bind($sql,'i',$_GET['id']);
    $subr = array();
    if($res->num_rows>0){
    while ($row = $res->fetch_assoc()) {
        array_push($subr,$row);
    }
    $r=array(
        "status"=>200,
        "list"=>$subr
    );
    }else{
        $r=array(
    "status"=>404,
        );
    }
}else{
    $dsql = new dSql;

$sql="SELECT * FROM uids";
$res = $dsql->bind($sql);
$subr = array();
if($res->num_rows>0){
while ($row = $res->fetch_assoc()) {
    array_push($subr,$row);
}
$r=array(
    "status"=>200,
    "list"=>$subr
);
}else{
    $r=array(
"status"=>404,
    );
}
}

echo json_encode($r,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
}else{
    loginwarn();
}