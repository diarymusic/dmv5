<?php
// session_start();
$_SESSION['ls']=(isset($_SESSION['ls']))?$_SESSION['ls']:0;
$_SESSION['ad']=(isset($_SESSION['ad']))?$_SESSION['ad']:0;
$_SESSION['br']=(isset($_SESSION['br']))?$_SESSION['br']:0;
$_SESSION['broadcast']=0;

// require_once '/app/Model/User.php';
// require_once '/app/View/UserView.php';
define('root',str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']));

require_once root."/app/model/counter/index.php";
require_once root."/app/model/classes/classes.php";
class UserController {
    public function getHtmlContentByTpl($filePath, $data) {
        ob_start();
        extract($data);
        include $filePath;
        $str = ob_get_contents();
        ob_end_clean();
        return $str;
    }
    /*
    public function showUser() {
        $user = new User('john', '123456');
        $view = new UserView($user);
        $view->render();
    }
*/
public function parseTemplate($template) {
    // 读取模板文件内容
    $content = file_get_contents($template);
    // echo $content;
    // 匹配变量和条件判断语句
    preg_match_all('/{{(.+?)}}|{%(.+?)%}/', $content, $matches);
    
    // 返回匹配结果
    // print_r($matches) ;
    return $matches;
    
}
public function bindVariables($content, $variables) {
    foreach ($variables as $key => $value) {
        $content = str_replace('{{' . $key . '}}', $value, $content);
    }
    return $content;
}
public function processIfStatements($content) {
    $pattern = '/\{% if (.+?) %\}(.*?)\{% endif %\}/s';
    
    while (preg_match($pattern, $content, $matches)) {
        $condition = $matches[1];
        $statement = $matches[2];
        
        // 执行条件判断语句
        $result = eval("return $condition;");
        
        // 根据结果保留或删除内容
        $content = str_replace($matches[0], $result ? $statement : '', $content);
    }
    
    return $content;
}
public function render($template, $variables) {
    // 解析模板文件
    $matches = self::parseTemplate($template);
    
    // 绑定变量
    $content = self::bindVariables($matches[0], $variables);
    
    // 处理条件判断
    $content = self::processIfStatements($content);
    
    // 输出结果
    echo $content;
    // print_r($content);
}
function home(){

    }
function showIntro(){
    $counter = new counter;
    echo self::getHtmlContentByTpl(root.'/app/view/intro/index.php',array(
        'views' => $counter->countIps()
    ));
    }
    function login(){
        echo self::getHtmlContentByTpl(root.'/app/view/login/index.html',array(

        ));
    }
    function register(){
        echo self::getHtmlContentByTpl(root.'/app/view/register/index.html',array(

        ));
        
    }
    function FPW(){
        echo self::getHtmlContentByTpl(root.'/app/view/FPW/index.html',array(

        ));
        
    }
    function changeInfo(){
        echo self::getHtmlContentByTpl(root.'/app/view/home/index.php',array(
            'token'=>(isset($_SESSION['token']))?$_SESSION['token']:'GUEST',
            'content'=>self::getHtmlContentByTpl(root.'/app/view/changeInfo/index.php',array())
        ));
        
    }
    function fail(){
        echo self::getHtmlContentByTpl(root.'/app/view/404.html',array(

        ));
    }
    function dash(){
        echo self::getHtmlContentByTpl(root.'/app/view/bs/index.php',array(
            'token'=>$_SESSION['token'],
            'content'=>self::getHtmlContentByTpl(root.'/app/view/bs/dashboard.html',array()),
            // 'cuid'=>$_SESSION['cuid']
            
        ));
    }
    function members(){
        echo self::getHtmlContentByTpl(root.'/app/view/bs/index.php',array(
            'token'=>$_SESSION['token'],
            'content'=>self::getHtmlContentByTpl(root.'/app/view/bs/members.html',array())
        ));
    }
    function broadcast(){
        echo self::getHtmlContentByTpl(root.'/app/view/bs/index.php',array(
            'token'=>$_SESSION['token'],
            'content'=>self::getHtmlContentByTpl(root.'/app/view/bs/broadcast.html',array())
        ));
    }
}