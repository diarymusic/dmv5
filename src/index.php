<?php
session_start();
?>
<script src="/js/jsLoader/main.js"></script>
<script src='https://cdn.bootcss.com/socket.io/2.0.3/socket.io.js'></script>
<?
// define('root',str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']));
require_once str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']) . "/app/controller/UserController.php";

$controller = new UserController();
$_SESSION['ls'] = (isset($_SESSION['ls'])) ? $_SESSION['ls'] : 0;
$_SESSION['ad'] = (isset($_SESSION['ad'])) ? $_SESSION['ad'] : 0;
$action = isset($_GET['action']) ? $_GET['action'] : 'home';

switch ($action) {
    case 'home':
        $counter = new counter;
        echo $controller->getHtmlContentByTpl(root . '/app/view/home/index.php', array(
            // 'views' => $counter->countIps()
            'token' => (isset($_SESSION['token'])) ? $_SESSION['token'] : 'GUEST',
            'content' => $controller->getHtmlContentByTpl(root . '/app/view/home/main.php', array())
        ));
        break;
    case 'bbs':
        $counter = new counter;
        echo $controller->getHtmlContentByTpl(root . '/app/view/home/index.php', array(
            // 'views' => $counter->countIps()
            'token' => (isset($_SESSION['token'])) ? $_SESSION['token'] : 'GUEST',
            'content' => $controller->getHtmlContentByTpl(root . '/app/view/home/bbs.html', array())
        ));
        break;
    case 'intro':
        $controller->showIntro();
        break;
    case 'login':
        $controller->login();
        break;
    case 'register':
        $controller->register();
        break;
    case 'fpw':
        $controller->FPW();
        break;
    case 'changeInfo':
        $controller->changeInfo();
        break;
    case 'chat':
        echo $controller->getHtmlContentByTpl(root . '/app/view/home/index.php', array('token' => (isset($_SESSION['token'])) ? $_SESSION['token'] : 'GUEST', 'content' => $controller->getHtmlContentByTpl(root . '/app/view/home/chat.html', array())));
        break;
    case 'logout':
        // session_unset();
        $_SESSION['ls'] = 0;
        $_SESSION['ad'] = 0;
        $_SESSION['token'] = 0;
        $_SESSION['lt'] = 0;
        // $_SESSION['bad']=0;
        // header('location:/?action=login');
        echo '<script>location.href="?action=login"</script>';
        break;
    default:
        $controller->fail();
        break;
}
?>