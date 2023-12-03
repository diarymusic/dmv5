<?php
session_start();

require_once str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']) . "/app/model/classes/classes.php";
header("Content-type: text/html; charset=utf-8");
$dsql = new dSql;
//getUserByToken
$subr = array();

if (isset($_GET['token'])) {
    $to = (
        substr(
            $_GET['token'],
            8,
            1
        ) == '-'
        && substr(
            $_GET['token'],
            13,
            1
        ) == '-'
        && substr(
            $_GET['token'],
            18,
            1
        ) == '-'
        && substr(
            $_GET['token'],
            23,
            1
        ) == '-'
    ) ? $_GET['token'] : 'GUEST';

    $sql = "SELECT *
    FROM uids
    WHERE token=?";
    $res = $dsql->bind($sql, 's', $to);

    if ($res->num_rows > 0) {
        while ($row = $res->fetch_assoc()) {
            $status = 200;
            array_push($subr, $row);
            $r = array(
                'status' => $status,
                'data' => $subr,
            );
echo json_encode($r, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

        }
    }else{
        // session_unset();
        $_SESSION['ls']=0;
        $_SESSION['ad']=0;
        $_SESSION['token']=0;
        $_SESSION['lt']=0;
        $status = 404;
        $r = array(
            'status' => $status,
            'data' => $subr,
        );
    echo json_encode($r, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

    }
} else {
    $_SESSION['ls']=0;
    $_SESSION['ad']=0;
    $_SESSION['token']=0;
    $_SESSION['lt']=0;
    $status = 404;
    $r = array(
        'status' => $status,
        'data' => $subr,
    );
echo json_encode($r, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

}
