<?php
header("Content-Type: application/json");

require("db.php");

$action = $_GET["action"];

if ($action == "create") {
    create();
} elseif ($action == "read") {
    read();
} elseif ($action == "update") {
    update();
} elseif ($action == "delete") {
    delete();
}

function create()
{
    $conn = getDb();
    $payload = json_decode(file_get_contents("php://input"));

    $query = $conn->query("INSERT INTO `inventory` (`id`, `name`, `price`, `qty`, `date`) VALUES (NULL, '$payload->name', '$payload->price', '$payload->quantity', '$payload->date');");

    echo json_encode("Item added successfully");
}

function read()
{
    $conn = getDb();
    $payload = json_decode(file_get_contents("php://input"));

    $query = $conn->query("SELECT * FROM `inventory`");
    $result = $query->fetchAll();

    echo json_encode($result);
}
function update()
{
    $conn = getDb();
    $payload = json_decode(file_get_contents("php://input"));

    $query = $conn->query("UPDATE `inventory` SET `name` = '$payload->name', `price` = '$payload->price', `qty` = '$payload->quantity', `date` = '$payload->date' WHERE `inventory`.`id` = $payload->id;");

    echo json_encode("Item updated successfully");
}
function delete()
{
    $conn = getDb();
    $payload = json_decode(file_get_contents("php://input"));

    $query = $conn->query("DELETE FROM `inventory` WHERE `inventory`.`id` = $payload->id;");

    echo json_encode("Item deleted successfully");
}
