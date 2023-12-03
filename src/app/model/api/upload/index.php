<?php
session_start();
error_reporting(0);
require_once str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']) . "/app/model/classes/classes.php";
header("Content-type: text/html; charset=utf-8");
$dsql = new dSql;

$to = (isset($_POST['token'])) ? $_POST['token'] : 'GUEST';
$roo = str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']);
$allowedExts = array("gif", "jpeg", "jpg", "png");

$fileName = $_FILES["file"]["name"];
$fileSize = $_FILES["file"]["size"];
$fileType = $_FILES["file"]["type"];
$fileTempName = $_FILES["file"]["tmp_name"];

$path_parts = pathinfo($fileName);

$filenameWithoutExt = $path_parts['filename'];
$fileExtension = $path_parts['extension'];

// echo "文件名: " . $filenameWithoutExtension . "\n";
// echo "文件后缀名: " . $fileExtension;

$targetFileName = 'uid_' . $to . '.' . $fileExtension;

$uploadDirectory = $roo . '/' . 'uploads/';
$targetFilePath = $uploadDirectory . $targetFileName;
$path = '/' . 'uploads/' . $targetFileName;
if (
    (
        ($fileType == "image/gif") ||
        ($fileType == "image/jpeg") ||
        ($fileType == "image/jpg") ||
        ($fileType == "image/pjpeg") ||
        ($fileType == "image/x-png") ||
        ($fileType == "image/png")
    ) &&
    ($fileSize < 8192000) &&
    in_array($fileExtension, $allowedExts)
) {
    if ($_FILES["file"]["error"] > 0) {
        echo json_encode(array(
            'path' => '/uploads/uid_GUEST.png',), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    } else {
        // if (file_exists($targetFilePath)) {
        //     $_SESSION['userAva'] = $path;
        //     echo json_encode(array('status' => '200', 'path' => $path), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        // } else {
            move_uploaded_file($fileTempName, $targetFilePath);
            $_SESSION['userAva'] = $path;
            echo json_encode(array(
                'status' => '200', 'path' => $path,
                'protoFileNameName' => $filenameWithoutExt.'.'.$fileExtension
    ), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        // }
    }
} else {
    echo json_encode(array('status' => '404','path' => '/uploads/uid_GUEST.png'), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}