<?php
session_start();
require_once str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']) . "/app/model/classes/classes.php";
header("Content-type: text/html; charset=utf-8");


// $sql = 'alter table uids drop `id`;
// alter table uids add `id` int not null primary key auto_increment first;';
if (isset($_GET['to'])) {
    if(isset($_GET['st'])){
        if($_GET['st'] == '0'){
    $dsqll = new dSql;
    $sqll = 'UPDATE `uids` SET `stat`= 0 WHERE `token`= ?;';
    $dsqll->bind($sqll,'s',$_GET['to']);
    $dsqll->close();
        }
    }
    


    $dsql = new dSql;
    $sql = "DELETE FROM `uids` WHERE (`stat` is null or `stat`=0) AND `token`=?;";
    $dsql->bind($sql,'s',$_GET['to']);
    $dsql->close();

    $dsqlll = new dSql;
    $sqlll = "alter table uids drop id;
alter table uids add id int not null primary key auto_increment first;";
    $dsqlll->multi($sqlll);
    $dsqlll->close();
    // $sqll = "alter table uids drop id;
// alter table uids add id int not null primary key auto_increment first;";
// $dsql->bind($sqll);

}