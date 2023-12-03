<?
session_start();
// session_unset();
$_SESSION['ls']='no';
$_SESSION['ad']='no';
$_SESSION['token']=0;
$_SESSION['lt']=0;
// $_SESSION=array();
// echo session_name();
setCookie(session_name(),'',time()-3600,'/',$_SERVER['SERVER_NAME']);
// session_destroy();
?>
<!-- <script>location.href="?action=login"</script> -->
