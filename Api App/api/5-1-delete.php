<?php
header("Content-type: application/json");
$post = file_get_contents("php://input");
$post = json_decode($post);

$host = "localhost";
$dbname = "fabs";
$user = "fabs";
$pass = "PmGzcScNHI7_/lA@";

try {
    $dsn =
        "mysql:
            host=$host;
            dbname=$dbname;
            user=$user;
            password=$pass;
        ";

    $conn = new PDO($dsn);
} catch (Exception $e) {
    echo $e;
}

$itemId = $post->id ?? null;


$conn->query("DELETE FROM `inventory` WHERE `inventory`.`id` = $itemId");
