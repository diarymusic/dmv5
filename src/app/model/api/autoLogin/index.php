<?
session_start();
require_once str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']) . "/app/model/classes/classes.php";
header("Content-type: text/html; charset=utf-8");
$dsql = new dSql;
// $subr = array();
$status = 404;
// echo $_POST['ue'] . PHP_EOL . $_POST['pw'];
if (isset($_POST['ue']) && isset($_POST['pw'])) {
    $username = $_POST['ue'];
    $password = $_POST['pw'];
    $sql = "SELECT *
    FROM uids
    WHERE acc=?";
    $res = $dsql->bind($sql, 's', $username);
    
    if($res->num_rows>0){
        while ($row = $res->fetch_assoc()) {
            $dsql->close();
            if ($password == $row['password']) {
                // 用户验证成功
                $status = 200;
                $code = $row['verf'];
                $r = array(
                    'status' => $status,
                    'code' => $code,
                );
                echo json_encode($r, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            } else {
                $status = 404;
                $msg = 'password';
                $code = null;
                $r = array(
                    'status' => $status,
                    'code' => $code,
                );
                echo json_encode($r, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            }
        }
    }
}else{
    $status = 404;
    $code = null;
    $r = array(
        'status' => $status,
        'code' => $code,
    );
    echo json_encode($r, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}

