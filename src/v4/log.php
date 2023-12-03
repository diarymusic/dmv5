<?php
function customerr($errno, $errstr){
    // echo "<b>Error:</b> [$errno] $errstr";
}
set_error_handler('customerr');
// $_POST['acc']='0';
// $_POST['psw']='default';
$ps ='0';
$id = '0';
$ps = md5($_POST['psw']);
$sta = '0';
// echo $ps;
$ly = array(
    md5("loned"),
    md5("loine"),
    md5("login"),
    md5("ogied"),
    md5("lgoni"),
);
$y = array_rand($ly,1);
$lf = array(
    md5("false"),
    md5("flaes"),
    md5("flsea"),
    md5("felsa"),
    md5("afles"),
);
$f = array_rand($lf,1);

$uidcont = file_get_contents('UID.json');
$d = json_decode($uidcont,true);

    $found_key = array_search($_POST['acc'], array_column($d, 'nm'),true);
    // echo $_POST['acc'];
// var_dump($found_key); 
// if($found_key === !false){
    // print($d[$found_key]['nm']);
    // print($d[$found_key]['ps']);
// }
    
    if($d[$found_key]['ps'] == $ps){
        session_start();
    //  注册登陆成功的 admin 变量，并赋值 true
    $_SESSION["admin"] = true;
    $_SESSION["username"] = $acc;
    $_SESSION["uid"] = $id;
    $url = '/manage.php';
    $param = '?'.'user='.urlencode($acc).'&'.'uid='.$id;
    exit('<script language="javascript">top.location.href="' . $url . $param . '"</script>');
        exit;
    }else{
        // echo"notok";
    }

     $info = array(
        "id"=>$id,
        "nm"=>'',
        'ps'=>$ps,
        $ly[$y]=>$sta,
    );
    
?>