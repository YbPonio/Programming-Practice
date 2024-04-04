<?php
header("Content-type: application/json");

$host = "localhost";
$dbname = "fabs";
$user = "fabs";
$pass = "PmGzcScNHI7_/lA@";

try {
    $dsn = "mysql:
    host=$host;
    dbname=$dbname;
    user=$user;
    password=$pass;
    ";

    $conn = new PDO($dsn);
} catch (Exception $e) {
    echo $e;
}

$post = file_get_contents("php://input");
$post = json_decode($post);

$id = $post->id;

$conn->query("UPDATE `inventory` SET `status` = '1' WHERE `inventory`.`id` = $id;");

echo json_encode("Item deleted successfully");
