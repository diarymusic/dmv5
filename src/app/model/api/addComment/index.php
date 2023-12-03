<?
session_start();
require_once str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']) . "/app/model/classes/classes.php";
header("Content-type: text/html; charset=utf-8");

function array_insert(&$array, $value, $index)
{
    return $array = array_merge(array_splice($array, max(0, $index - 1)), array($value), $array);
}

// print_r($_POST);
if (isset($_POST) && $_SESSION['ls'] == 1 && isset($_POST['content']) && isset($_POST['owner'])) {
$dsqllist = new dSql;
$res = $dsqllist->bind('SELECT * FROM `broadcast` WHERE `id`=?', 'i', $_POST['id']);
if ($res->num_rows > 0) {
    while ($row = $res->fetch_assoc()) {
        $comments = json_decode($row['comments'], true);
        // var_dump($row);
    }
} else {
    $comments = array();
}
$dsqllist->close();
// array_push(
//     $comments,
//     array(
//         "content" => $_POST['content'],
//         "owner" => $_POST['owner'],
//         "comments" => ""
//     )
//     // $_POST['content']
// );
$r = array(
    /**内容 */
    "status" => 200,
    "lists" => $lists,
    // "owner"=>$_POST['owner'],
);

{$sr = array(
    //comments
        "status" => 200,
        "lists" => array(
        0 => array(
            "content" => "",
            "owner" => array(
                "id" => "",
            ),
            "comments" => array(
                "lists" => array(
                    0 => array(
                        "content" => "",
                        "owner" => array(
                            "id" => "",
                        ),
                        "comments" => array(

                        )
                        ),
                    1 => array(
                        "content" => "",
                        "owner" => array(
                            "id" => "",
                        ),
                        "comments" => array(

                        )
                        ),
                )
            )
        ),
        1 => array(
            "content" => "",
            "owner" => array(
                "id" => "",
            ),
            "comments" => array(
                "lists" => array(
                    0 => array(
                        "content" => "",
                        "owner" => array(
                            "id" => "",
                        ),
                        "comments" => array(

                        )
                        ),
                        1 => array(
                            "content" => "",
                            "owner" => array(
                                "id" => "",
                            ),
                            "comments" => array(
    
                            )
                        )
                )
            )
        ),
    )
);}
// print_r($sr);
// $sssr =  json_encode($sr, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
// print_r($comments) ;
$dsql = new dSql;
$dsql->bind(
    'UPDATE `broadcast` SET `comments`=? WHERE `id`=?;',
    'si',
    json_encode($sr, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
    // $_POST['id']
    13
);
$dsql->close();
}
// print_r($_POST);


// print_r($sr);
echo json_encode($comments);