<?php
$roo = str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']);
require_once $roo."/app/model/classes/classes.php";
$uuid = new UUID;
echo json_encode(array(
    'status'=>200,
    'uuid'=>$uuid->create_uuid()
));