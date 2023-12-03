<?php
session_start();
require_once str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']) . "/app/model/classes/classes.php";
header("Content-type: text/html; charset=utf-8");
$dsql = new dSql;
$subr = array();
$status = 404;
// echo $_POST['ue'] . PHP_EOL . $_POST['pw'];
if (isset($_POST['ue']) && isset($_POST['pw']) && isset($_POST['vf'])) {
    $username = $_POST['ue'];
    $password = $_POST['pw'];
    $vf = $_POST['vf'];
    $sql = "SELECT *
    FROM uids
    WHERE acc=?";
    $res = $dsql->bind($sql, 's', $username);
    
    if($res->num_rows>0){
        while ($row = $res->fetch_assoc()) {
            $dsql->close();
            if ($password == $row['password']) {
                // 用户验证成功
                
                if($vf==$row['verf']){
                    /////////////////////////////////////
                    $_SESSION['ls'] = 1;
                    // if(isset($_POST['al'])){
                        
                    // }
                    $_SESSION['token'] = $row['token'];
                if ($row['permission'] == 99) {
                    $_SESSION['ad'] = 1;
                }
                $status = 200;
                array_push($subr,$row);
                

                $_SESSION['lt'] =$LT =sha1(mt_rand().$row['acc'].$row['username'].$row['password'].$row['token'].$row['permission']);
                /////////////////////////////
                }else{
                    $status = 404;
                }
                
            } else {
                $status = 404;
                $msg = 'password';
            }
        }
    }
}else{
    $status = 404;
}
$r = array(
    'status' => $status,
    'data' => $subr,
    // 'Ltoken'=>$LT
);
echo json_encode($r, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
