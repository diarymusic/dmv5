<?
session_start();
require_once str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']) . "/app/model/classes/classes.php";
header("Content-type: text/html; charset=utf-8");
$dsql = new dSql;
// print_r($_POST);
$pub=0;
// foreach ($_POST as $key => $value) {
//     # code...
//     echo $key."   ".$value;
// }
$_POST['public']=(isset($_POST['public']))?$_POST['public']:0;
$_SESSION['ad']=(isset($_SESSION['ad']))?$_SESSION['ad']:0;
if($_POST['public']==1){
    if($_SESSION['ad']==1){
        $pub=1;
    }else{
$pub=0;
    }
}
if (isset($_POST) && $_SESSION['ls'] == 1&&$_POST['owner']) {
    $subr = array();
    // array_push($r,$_POST['title']);
    for ($i = 0; $i < count($_POST['paragraphs']); $i++) {
        # code...
        array_push(
            $subr,
            /*array(
            "paragraph".$i=>*/
            $_POST['paragraphs'][$i]
            // )
        );
    }
    $r = array(
        /**内容 */
        "title" => $_POST["title"],
        "paragraphs" => $subr,
        // "owner"=>$_POST['owner'],
    );
    echo json_encode($r, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    $dsql->bind(
        'INSERT INTO `broadcast` (`content`,`owner`,`ispublic`) VALUES (?,?,?);',
        'ssi',
        json_encode($r, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
        json_encode($_POST['owner'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
        /**所有者 */
        $pub
    );
}
// print_r($_POST);