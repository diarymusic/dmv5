<?php
session_start();
$roo = str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']);
require_once $roo."/app/model/classes/classes.php";
require_once $roo."/app/controller/UserController.php";
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require $roo.'/mail/PHPMailer.php';
require $roo.'/mail/SMTP.php';
require $roo.'/mail/Exception.php';

header("Content-type: text/html; charset=utf-8");

if(isset($_POST['em'])&&isset($_POST['npw'])&&isset($_POST['vf'])){
    if(filter_var($_POST['em'], FILTER_VALIDATE_EMAIL)!==false){
        $dsql = new dSql;
        $em=$_POST['em'];
        $sql = "SELECT `acc`,`verf` FROM uids WHERE (`acc`=?);";
        $resl =$dsql->bind($sql,'s',$em);
        if($resl->num_rows>0){
            $dsqlll = new dSql;
            $reslll = $dsqlll->bind('SELECT `verf` FROM uids WHERE (`acc`=?);','s',$em);
            if($reslll->num_rows>0){
                while ($rowlll = $reslll->fetch_assoc()){
                    if($_POST['vf'] == $rowlll['verf']){
                        while ($rowl = $resl->fetch_assoc()) {
                            $dsqll=new dSql;
                            $dsqll->bind("UPDATE `uids` SET `password`=? WHERE (`acc`=?);",'ss',$_POST['npw'],$em);
                                $status=200;
                                $msg = 'OK';
                                echo json_encode(array('status'=>$status,"msg" => $msg),JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
                            
                        }
                    }else{
                        $status=403;
                        $msg = '请检查验证码';
                        echo json_encode(array('status'=>$status,"msg" => $msg),JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
                    }
                }
            }else{
        $status=404;
        $msg = '请检查邮箱';
        echo json_encode(array('status'=>$status,"msg" => $msg),JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
            }
            // $res->fetch_assoc();

        }else{
            $status=404;
            echo json_encode(array('status'=>$status),JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
        }
    }else{
        $status=404;
        $msg = '请检查邮箱';
        echo json_encode(array('status'=>$status,"msg" => $msg),JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
    }
}else{
    $status=404;
    echo json_encode(array('status'=>$status),JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
}

