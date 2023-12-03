<?php
session_start();
require_once str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']) . "/app/model/classes/classes.php";
header("charset=utf-8");
$url = 'https://music.163.com/api/artist/albums/55799880?id=55799880&offset=0&total=true&limit=1000';
// echo file_get_contents($url);
$res = json_decode(file_get_contents($url),true);
$r=array();
for ($i=0; $i < count($res['hotAlbums']); $i++) { 
    # code...hotAlbums[0].id
    $songname = $res['hotAlbums'][$i]['name'];
    $cover = $res['hotAlbums'][$i]['picUrl'];
    $lin = $res['hotAlbums'][$i]['id'];
    // echo $songname;
    // echo $cover;
    $artist = array();
    for($a=0; $a < count($res['hotAlbums'][$i]['artists']); $a++){
        array_push($artist,
            array(
                "name"=>$res['hotAlbums'][$i]['artists'][$a]['name'],
                "link"=>'https://music.163.com/#/artist?id='.$res['hotAlbums'][$i]['artists'][$a]['id']
            )
        );
    // $res['hotAlbums'][$i]['artists'][$a]['name'];
        // echo $artist;
    }
    // echo "<br><br>";
    array_push($r,
        array(
            'id'=>$i,
            'title'=>$songname,
            'cover'=>$cover,
            'author'=>$artist,
            "link"=>"https://music.163.com/#/album?id=".$lin
        )
    );
}
array_push($r,array(
    'id'=>$i+1,
    'title'=>'Polyhedron',
    'cover'=>'http://p1.music.126.net/NUKMB7jMao1t3pD48k6d_Q==/109951168316320824.jpg',
    'author'=>array(
        "Attic",
        "SeynChild"
    ),
    "link"=>''
    
)
);
// print_r($r);
echo json_encode($r,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);