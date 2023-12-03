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


function getHtmlContentByTpl($filePath, $data) {
    ob_start();
    extract($data);
    include $filePath;
    $str = ob_get_contents();
    ob_end_clean();
    return $str;
}


$dsql= new dSql;
$dsqll = new dSql;



$fromAddr = 'diarymusic@outlook.com';
// $sendAddr = 'neutrosted@outlook.com';

$controller = new UserController;
function send($fromAddr,$em,$cont){
    $mail = new PHPMailer(true);
    try {
        // 邮件服务器设置
        $mail->isSMTP();
        $mail->Host = 'smtp-mail.outlook.com';  // 你的SMTP服务器地址
        $mail->SMTPAuth = true;
        $mail->Username = 'diarymusic@outlook.com';  // 你的SMTP用户名
        $mail->Password = 'Diary20230119';  // 你的SMTP密码
        $mail->SMTPSecure = 'tls';  // 使用TLS加密
        $mail->Port = 587;  // SMTP端口号
        $mail->CharSet = "utf-8";
        // 邮件内容设置
        $mail->setFrom($fromAddr, 'Diary Music');
        $mail->addAddress($em);
        $mail->isHTML(true);
        $mail->Subject = 'Diary Music 验证码';
        $mail->Body = $cont;
    
        // 发送邮件
        $mail->send();
        // echo '邮件发送成功';
        return array(
            200
        );
    } catch (Exception $e) {
        // echo '邮件发送失败: ' . $mail->ErrorInfo;
        return array(
            404,$e
        );
    }
}
if(isset($_GET['to']) && isset($_GET['em'])){
    if(filter_var($_GET['em'], FILTER_VALIDATE_EMAIL)!==false){
        $em = $_GET['em'];
        $sqll = 'SELECT `verf` FROM uids WHERE (`token`=?);';
        $res = $dsqll->bind($sqll,'s',$_GET['to']);
        if($res->num_rows>0){
            while ($row = $res->fetch_assoc()) {
                $status = send('neutrosted@outlook.com',$em,getHtmlContentByTpl($roo.'/app/view/verifyCode/index.php',array(
                    'vc'=>$row['verf']
                )));
            }
        }
    }else{
        $status = 404;
    }

    
    // echo json_encode(array(
    //     'status'=>200,
    // ),JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
}elseif(isset($_GET['em'])){
    if(filter_var($_GET['em'], FILTER_VALIDATE_EMAIL)!==false){
        $em = $_GET['em'];
        $sqll = 'SELECT `verf` FROM uids WHERE (`acc`=?);';
        $res = $dsqll->bind($sqll,'s',$em);
        if($res->num_rows>0){
            while ($row = $res->fetch_assoc()) {
                $status = send('diarymusic@outlook.com',$em,getHtmlContentByTpl($roo.'/app/view/verifyCode/index.php',array(
                    'vc'=>$row['verf']
                )));
            }
        }
    }else{
        $status = 404;
    }
}else{
$status = 404;
}
echo json_encode(array(
    'status'=>$status
),JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);

