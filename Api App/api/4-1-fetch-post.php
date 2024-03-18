<?php
header("Content-type: application/json");

$post = file_get_contents("php://input");
$post = json_decode($post);

// echo json_encode($post);

$username = $post->username ?? null;
$password = $post->password ?? null;

if ($username == 'user' && $password == 'user') {
    echo 1;
} else {
    echo 0;
}
