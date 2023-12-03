<?php
session_start();
require_once str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']) . "/app/model/classes/classes.php";
header("Content-type: text/html; charset=utf-8");
$dsql = new dSql;
//lock a token
$sr = array('status'=>'200','msg'=>'not_exist');
$eer = array('status'=>'404','msg'=>'exist');
$er = array('status'=>'403','msg'=>'no_parameters');
$err = array('status'=>'401','msg'=>'email_error');
if(isset($_GET['em'])){
    if(filter_var($_GET['em'], FILTER_VALIDATE_EMAIL)!==false){
        $em = $_GET['em'];
        $sql = "SELECT `acc` FROM uids WHERE `acc`=?;";
        $res = $dsql->bind($sql,'s',$em);
        if($res->num_rows>0){
            $status = $eer;
            $res->fetch_assoc();
        }else{
            $status = $sr;
        }
    }else{
        $status = $er;
    }
}else{
    $status = $err;
}
// $sql1 = 'SET @rownum = 0; 
// UPDATE uids SET id =@rownum:=@rownum+1 
// WHERE id >0;';
// $dsql->bind($sql1);
echo json_encode($status);
$dsql->close();