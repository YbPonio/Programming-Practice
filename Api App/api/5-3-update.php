<?php
header("Content-type: application/json");

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

$post = file_get_contents("php://input");
$post = json_decode($post);

$name = $post->name;
$price = $post->price;
$qty = $post->quantity;
$category = $post->category;
$expiry_date = $post->expiryDate;
$item_id = $post->id;


$query = $conn->query("UPDATE `inventory` SET `name` = '$name', `price` = '$price', `qty` = '$qty', `category` = '$category', `expiry_date` = '$expiry_date' WHERE `inventory`.`id` = $item_id;");
