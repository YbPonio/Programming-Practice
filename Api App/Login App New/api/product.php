<?php
header("Content-Type: application/json");

require("./db.php");

$action = $_GET["action"];

if ($action == "read") {
    read();
} elseif ($action == "create") {
    create();
} elseif ($action == "update") {
    update();
} elseif ($action == "delete") {
    delete();
}


function read()
{
    $conn = getDB();
    $query = $conn->query("SELECT * FROM `inventory`");

    $result = $query->fetchAll();
    echo json_encode($result);
}


function create()
{
    $conn = getDB();
    $payload = json_decode(file_get_contents("php://input"));

    $query = $conn->query("INSERT INTO `inventory` (`id`, `name`, `details`, `price`, `qty`, `image`) VALUES (NULL, '$payload->name', '$payload->details', '$payload->price', '$payload->quantity', '$payload->image');");

    if ($query) {
        http_response_code(200);
        echo "Product created successfully";
    } else {
        http_response_code(400);
    }
}

function update()
{
    $conn = getDB();
    $payload = json_decode(file_get_contents("php://input"));

    $query = $conn->query("UPDATE `inventory` SET `name` = '$payload->name', `details` = '$payload->details', `price` = '$payload->price', `qty` = '$payload->quantity', `image` = '$payload->image' WHERE `inventory`.`id` = $payload->id;");

    $result = $query->fetch();
    echo json_encode($result);
}


function delete()
{
    $conn = getDB();
    $payload = json_decode(file_get_contents("php://input"));

    $query = $conn->query("DELETE FROM inventory WHERE `inventory`.`id` = $payload->id");

    if ($query) {
        http_response_code(200);
        echo "Product deleted successfully";
    } else {
        http_response_code(400);
    }
}
