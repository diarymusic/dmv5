<?
session_start();
require_once str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']) . "/app/model/classes/classes.php";
header("Content-type: text/html; charset=utf-8");
$dsql = new dSql;
function update(){
    $dsqll = new dSql;
    $ress = $dsqll->bind("UPDATE `uids` SET `username`=?","s",@$_POST['username']);
    return true;
}
if(@$_GET['token']&&@$_POST['pass']&&@$_POST['username']){
    $res=$dsql->bind("SELECT `password` FROM `uids` WHERE `token`=?","s",$_GET['token']);
    if($res->num_rows>0){
        $row = $res->fetch_assoc();
        $vali=($row['password']==$_POST['pass']);
        $_SESSION['vpsw']=($vali)?1:0;
        // $stat=($vali)?200:404;
        (int) $stat = ($vali)?((update())?200:404): 404;
    }
}else{
    $stat=404;
}
echo json_encode(array(
    "status"=>$stat
));