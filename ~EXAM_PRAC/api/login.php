<?php
header("Content-Type: application/json");

require("db.php");

$action = $_GET["action"];

if ($action == "login") {
    login();
} else if ($action == "check") {
    check();
}

function login()
{
    $conn = getDB();
    $data = json_decode(file_get_contents("php://input"));

    $query = $conn->query("SELECT * FROM `users` WHERE `username` LIKE '$data->username' AND `password` LIKE '$data->password'");
    $result = $query->fetch();

    if ($result) {
        http_response_code(200);
        echo json_encode(["success" => true, "data" => $result]);
    } else {
        http_response_code(401);
        echo json_encode(["success" => false]);
    }
}
function check()
{
    $conn = getDB();
    $data = json_decode(file_get_contents("php://input"));

    $query = $conn->query("SELECT * FROM `users` WHERE `token` LIKE '$data->token'");
    $result = $query->fetch();

    if ($result) {
        http_response_code(200);
        echo json_encode(["success" => true, "data" => $result]);
    } else {
        http_response_code(401);
        echo json_encode(["success" => false]);
    }
}
