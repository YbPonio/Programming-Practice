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

$name = $post->name ?? null;
$price = $post->price ?? null;
$quantity = $post->quantity ?? null;
$category = $post->category ?? null;
$expiryDate = $post->expiryDate ?? null;

echo $name, $price, $quantity, $category, $expiryDate;

if ($name && $price && $quantity && $category && $expiryDate) {
    $query = $conn->query("INSERT INTO `inventory`(`id`, `name`, `price`, `qty`, `category`, `expiry_date`, `status`) VALUES ('null','$name','$price','$quantity','$category','$expiryDate','0')");
}
