<?
session_start();
require_once str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']) . "/app/model/classes/classes.php";
header("Content-type: text/html; charset=utf-8");

if($_SESSION['ls']==0){
    
}
$_GET['type']=(isset($_GET['type']))?$_GET['type']:"broadcast";
$id=(isset($_GET['id']))?$_GET['id']:"-1";
$dsql = new dSql;
if($_GET['type']=="broadcast"){
    $sql='SELECT * FROM `broadcast` WHERE (`ispublic`=1) ORDER BY `id` DESC LIMIT 1';
    $res = $dsql->bind($sql);
    if($res->num_rows<=0){
        echo json_encode(array(
        "status"=>404
    ));
    }
}
if($_GET['type']=="passage"){
    if($id==-1){
        $sql='SELECT * FROM `broadcast` ORDER BY `id` DESC';
        $res = $dsql->bind($sql);
    }else{
        
        $sql='SELECT * FROM `broadcast` WHERE `id`=?';
        $res = $dsql->bind($sql,'i',$id);
    }
}
// else{
//     echo json_encode(array(
//         "status"=>404
//     ));
// }
// $r = array('status'=>200)
$fr=array();
$list = array();

if ($res->num_rows > 0) {
while($row = $res->fetch_assoc()){
        $content = json_decode($row['content'],true) ;
        // echo json_encode($row,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
        // array_push($subr,$row);
        $subr = array(
            "status"=>200,
            "content"=>$content
        );
        
    $r = array(
        "id"=>$row['id'],
        "data"=>$subr,
        "owner"=>json_decode($row['owner'],true)
    );
        array_push($list,$r);

    }
    $fr=array(
        "status"=>200,
        "list"=>$list,
    );

echo json_encode($fr,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);

}