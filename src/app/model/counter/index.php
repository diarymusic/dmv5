<?php
class counter{
    function __construct(){

    }
    function countIps(){
        $counter_fname = 'counter' . '.txt'; //动态获取需要统计的页面，并进行命名
        $counter_ips = 'ip'
            //   .$_REQUEST["id"]
            . '.txt'; //
        $counter = file_get_contents($counter_fname);
        $counter += 0;
        //判断本IP是否曾经访问过
        $ips = preg_split("/\s+/", file_get_contents($counter_ips));
        $ip = $_SERVER["REMOTE_ADDR"];
        if (!in_array($ip, $ips)) { //倘若该IP不在ip文件夹中，就新增加访问数据
//更新计数器
            $counter++;
            if ($fp = fopen($counter_fname, 'w')) {
                fputs($fp, $counter);
                fclose($fp);
            }
            //更新访问IP
            if ($fp = fopen($counter_ips, 'a')) {
                fputs($fp, "\n$ip");
                fclose($fp);
            }
        }
        return $counter;
    }
}