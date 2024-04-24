<?php
header("Content-Type: application/json");

require("./db.php");

$action = $_GET["action"];

if ($action == "read") {
    read();
}


function read()
{
    $conn = getDB();
    $query = $conn->query("SELECT * FROM `inventory`");

    $result = $query->fetchAll();

    if ($result) {
        http_response_code(200);
        echo json_encode($result);
    } else {
        http_response_code(400);
    }
}
