<?php
header("Content-Type: application/json");

$host = "localhost";
$dbname = "pds";
$user = "pds";
$pass = "VpaHUjUqNN.w(0A*";

try {
    $dsn =
        "mysql:
            host=$host;
            dbname=$dbname;
            user=$user;
            password=$pass;
        ";

    $conn = new PDO($dsn);
} catch (PDOException $e) {
    echo $e;
}

$action = $_GET["action"] ?? "read";

if ($action == "create") {
    $payload = file_get_contents("php://input");
    $payload = json_decode($payload);

    $name = $payload->name->firstName;
    $lname = $payload->name->lastName;
    $street = $payload->address->street;
    $city = $payload->address->city;
    $region = $payload->address->region;
    $zip = $payload->address->zip;
    $country = $payload->address->country;

    $query = $conn->query("INSERT INTO `information` (`id`, `name`, `lastName`, `occupation`, `date`, `street`, `city`, `region`, `zip`, `country`, `gender`, `email`, `phone`) 
    VALUES (
        NULL, 
        '$name', 
        '$lname',
        '$payload->occupation', 
        '$payload->date', 
        '$street', '$city', '$region', '$zip', '$country', 
        '$payload->gender', 
        '$payload->email', 
        '$payload->phone');");
} elseif ($action == "read") {
    $query = $conn->query("SELECT * FROM `information`");
    $result = $query->fetchAll();
    echo json_encode($result);
} elseif ($action == "update") {
    $payload = json_decode(file_get_contents("php://input"));

    $name = $payload->name->firstName;
    $lname = $payload->name->lastName;
    $street = $payload->address->street;
    $city = $payload->address->city;
    $region = $payload->address->region;
    $zip = $payload->address->zip;
    $country = $payload->address->country;

    $query = $conn->query("UPDATE `information` 
    SET `name` = '$name', 
    `lastName` = '$lname', 
    `occupation` = '$payload->occupation', 
    `date` = '$payload->date', 
    `street` = '$street', 
    `city` = '$city', 
    `region` = '$region', 
    `zip` = '$zip', 
    `country` = '$country', 
    `gender` = '$payload->gender', 
    `email` = '$payload->email', 
    `phone` = '$payload->phone' 
    WHERE `information`.`id` = $payload->id;");
} elseif ($action == "delete") {
    $payload = json_decode(file_get_contents("php://input"));

    $query = $conn->query("DELETE FROM `information` WHERE `information`.`id` = $payload->id;");
}
