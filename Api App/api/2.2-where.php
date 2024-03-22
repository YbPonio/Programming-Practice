<?php
header("Content-type: application/json");

$host = "localhost";
$dbname = "fabs";
$user = "fabs";
$pass = "PmGzcScNHI7_/lA@";
$search = $_GET['search'] ?? null;

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

// $query = $conn->query("SELECT * FROM `inventory` WHERE `name` LIKE '%$search%' ORDER BY `name` ASC");
$query = $conn->query(
    "SELECT * FROM `inventory` 
    WHERE  (`name` LIKE '%$search%' OR 
            `id` = '$search' OR 
            `category` LIKE '%$search%' OR 
            `price` = '$search' OR 
            `qty` = '$search' OR 
            `expiry_date` LIKE '%$search%')
    ORDER BY `id` ASC"
);
$result = $query->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);
// print_r($result = $query->fetchAll(PDO::FETCH_));
// echo "<pre>";
// print_r($result);
