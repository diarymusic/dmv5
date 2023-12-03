<?php
//case 26 文件管理器
//设置配置文件中，只能访问本目录
ini_set('open_basedir',__DIR__);
//路径
$path = isset($_GET['path'])?$_GET['path']:'.';
//文件名
$file = '';
//判断，如果是文件类型
if(is_file($path))
{
    //获得文件名
    $file = basename($path);
    //获得路径
    $path = dirname($path);
}
//判断，不是目录
elseif(!is_dir($path))
{
    die('无效的文件路径参数');
}
 
//获得文件列表
function getFileList($path)
{
    //打开目录，获得句柄
    $handle = opendir($path);
    //空数组
    $list = array('dir'=>array(),'file'=>array());
    //从目录总读取文件
    while(false !==($file_name = readdir($handle)))
    {
        //除去上级目录和本级目录
        if($file_name != '.' && $file_name != '..')
        {
            //文件全路径
            $file_path = "$path/$file_name";
            //文件类型
            $file_type = filetype($file_path);
            //判断，文件类型是文件或者目录
            if(!in_array($file_type,array('file','dir')))
            {
                continue;
            }
            //数组填入值
            $list[$file_type][] = array(
                'file_name'=>$file_name,
                'file_path'=>$file_path,
                'file_size'=>round(filesize($file_path)/1024),
                'file_time'=>date('Y/m/d H:i:s',filemtime($file_path)),
            );
        }
    }
    //释放句柄
    closedir($handle);
    return $list;
}
//处理操作
$action = isset($_GET['a'])?$_GET['a']:'';
//根据操作动作，执行相应程序
switch ($action)
{
    //返回上一级
    case 'prev':
        $path = dirname($path);
        break;
    //复制
    case 'copy':
        if($file)
        {
            if(file_exists("$path/$file.txt"))
            {
                die('文件名冲突，复制失败');
            }
            if(!copy("$path/$file","$path/$file.txt"))
            {
                die('复制文件失败');
            }
        }
        break;
    //删除
    case 'del':
        if($file)
        {
            unlink("$path/$file");
        }
        break;
    //重命名
    case 'rename':
        if(isset($_POST['rename']))
        {
            $target = isset($_POST['target'])?trim($_POST['target']):'';
            if($file && $target)
            {
                if(file_exists("$path/$target"))
                {
                    die('目标文件已存在');
                }
                rename("$path/$file","$path/$target");
                header('Location:?path='.$path);
                die;
            }
 
        }
        break;
 
}
 
$file_list = getFileList($path);
 
?>
 
<html>
<head>
    <meta charset="UTF-8">
    <title>文件管理器</title>
    <style>
	body{ font-size:12px;}
	img{ width:20px;}
	a:link, a:visited { color:#555; text-decoration:none; } 
    a:hover, a:active { color:#ff0000; text-decoration:underline;} 
	.tbl{ border-collapse:collapse; width:98%; margin-top:10px; font-size:12px;}
	.tbl th{ text-align:left; background:#ccc;}
	.tbl th,td{ border:1px solid #eee;}
	span{color:#ff0000;}
  </style>
</head>
<body>
<div>
    <a href="?path=<?= $path;?>&a=prev">返回上一级目录</a>
</div>
<?php  if($action == 'rename'): ?>
<form method="post">
    将<span><?= $file;?></span>
    重命名为：<input type="text" value="<?= $file;?>" name="target">
    <input type="submit" name="rename" value="确定">
</form>
<?php endif;?>
 
 
<table width="60%" style="font-size: 9px;text-align: center;">
    <tr>
        <th>图标</th>
        <th>名称</th>
        <th>修改日期</th>
        <th>大小</th>
        <th>路径</th>
        <th>操作</th>
    </tr>
    <?php  foreach ($file_list['dir'] as $v): ?>
    <tr>
        <td><img src="./img/list.png"></td>
        <td><?= $v['file_name'];?></td>
        <td><?= $v['file_time']?></td>
        <td>-</td>
        <td><?= $v['file_path'];?></td>
        <td><a href="?path=<?= $v['file_path'];?>">打开</a></td>
    </tr>
    <?php endforeach;?>
    <?php foreach ($file_list['file'] as $v):?>
    <tr>
        <td><img src="./img/file.png"></td>
        <td><?= $v['file_name'];?></td>
        <td><?= $v['file_time'];?></td>
        <td><?= $v['file_size'];?>KB</td>
        <td><?= $v['file_path'];?></td>
        <td>
            <a href="?path=<?= $v['file_path']?>&a=rename">重命名</a>&nbsp;&nbsp;
            <a href="?path=<?= $v['file_path']?>&a=copy">复制</a>&nbsp;&nbsp;
            <a href="?path=<?= $v['file_path']?>&a=del">删除</a></td>
    </tr>
    <?php endforeach;?>
</table>
</body>
</html>
