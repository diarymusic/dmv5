<?
session_start();
require_once str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']) . "/app/model/classes/classes.php";
header("Content-type: text/html; charset=utf-8");
$dsql = new dSql;
if(@$_GET['token']&&@$_POST['pass']){
    $res=$dsql->bind("SELECT `password` FROM `uids` WHERE `token`=?","s",$_GET['token']);
    if($res->num_rows>0){
        $row = $res->fetch_assoc();
        $vali=($row['password']==$_POST['pass']);
        $_SESSION['vpsw']=($vali)?1:0;
        $stat=($vali)?200:404;
    }
}else{
    $stat=404;
}
echo json_encode(array(
    "status"=>$stat
));