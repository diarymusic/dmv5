<?
session_start();
?>
<script src="/js/jsLoader/main.js"></script>
<?
$_SESSION['ls']=(isset($_SESSION['ls']))?$_SESSION['ls']:0;
$_SESSION['ad']=(isset($_SESSION['ad']))?$_SESSION['ad']:0;
require_once str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT'])."/app/controller/UserController.php";
$controller = new UserController();
    if($_SESSION['ls'] == 1 && $_SESSION['ad'] == 0){
        echo $controller->fail();
        // echo "fail";
    exit();
}elseif($_SESSION['ls'] == 1 && $_SESSION['ad'] == 1){
        //管理页面使用
    }else{
        echo $controller->fail();
        exit();
    }



$action = isset($_GET['action']) ? $_GET['action'] : 'dashboard';

switch ($action) {
    case 'dashboard':
        echo $controller->dash();
        break;
    case 'members':
        echo $controller->members();
        break;
    case 'broadcast':
        echo $controller->broadcast();
        break;
    default:
        echo $controller->dash();
        break;
}
?><script>
function jsLoader(path) {
    $.ajax({
        url:"",
        dataType:"text",
        success:(resp)=>{
            eval(resp);
        }
    })
}
</script>