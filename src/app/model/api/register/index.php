<?php
session_start();
require_once str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']) . "/app/model/classes/classes.php";
header("Content-type: text/html; charset=utf-8");
$dsql = new dSql;
$dsqll = new dSql;
$dsqlll = new dSql;
if (isset($_POST['un'], $_POST['ue'], $_POST['pw'], $_POST['to'], $_POST['vf'])) {
    if ($dsqlll->bind('SELECT `acc` FROM uids WHERE `acc`=?;', 's', $_POST['ue'])->num_rows > 0) {
        $status = 404;
        // echo "email";
    } else {
        $sqll = 'SELECT `verf` FROM uids WHERE (`token`=?);';
        $res = $dsqll->bind($sqll, 's', $_POST['to']);
        if ($res->num_rows > 0) {
            while ($row = $res->fetch_assoc()) {
                $st = ($_POST['vf'] == $row['verf']) ? true : false;
                // echo $_POST['vf'];
                // echo $row['verf'];
            }
        }

        $perm = 0; // 默认权限
        // $sql = "UPDATE uids 
        // SET `acc`=? , `username`=? , `password`=? , `avatar`=? , `permission`=?
        // WHERE (`token`=?)";
        $sql = "UPDATE `uids` SET `acc`=? , `username`=? , `password`=? , `permission`=? , `stat`=? WHERE (`token`=?);";
        $dsql->bind($sql, 'sssiis', $_POST['ue'], $_POST['un'], $_POST['pw'], $perm, 2, $_POST['to']);
        $status = 401;
        $dsql->close();
        if ($st === true) {
            $status = 200;
        } else {
            $status = 401;
        }

        $_SESSION['token'] = $_POST['to'];
        $_SESSION['ls'] = 1;
    }

} else {
    $status = 404;
}
echo json_encode(
    array(
        'status' => $status
    ), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
// echo ($_POST['un'].PHP_EOL. $_POST['ue'].PHP_EOL. $_POST['pw'].PHP_EOL. $_POST['to'].PHP_EOL.$ap.PHP_EOL.$perm);
/*(`acc`, `username`, `password`, `avatar`, `permission`)*/