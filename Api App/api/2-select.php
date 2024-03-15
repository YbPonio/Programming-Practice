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

$query = $conn->query("SELECT * FROM `inventory` ORDER BY `name` ASC");
$result = $query->fetchAll();
// print_r($result = $query->fetchAll(PDO::FETCH_));
// echo "<pre>";
// print_r($result);

echo json_encode($result);
