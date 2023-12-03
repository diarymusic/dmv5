<?php 
// function countpar($par,$p1,$p2,$p3){
//     echo func_num_args();
// }
// countpar(1,2,3,4);

require_once "I:/dmv4/app/model/classes/classes.php";
$test = new dSql;
//查询
/** */


$sql="SELECT * FROM songs WHERE id=?";
$res = $test->bind($sql,'i',1);
$r = array();
while ($row = $res->fetch_assoc()) {
    array_push($r,$row);
}
// print_r($r);
echo json_encode($r,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);




//添加

/**

$sql="INSERT INTO songs (`cover`, `title`, `author`, `idct`, `link`) VALUES(?, ?, ?, ?, ?)";
$test->bind($sql,'sssss','1','1','1','1','1');


*/


/**
$sql="UPDATE songs SET ;";
$test->bind($sql);

*/
