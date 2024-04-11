<?php
require("./db.php");

$action = $_GET['action'] ?? null;

if ($action == "login") {
    login();
} else if ($action == "check") {
    check();
}

function login()
{
    $conn = getDB();

    $payload = file_get_contents("php://input");
    $payload = json_decode($payload);

    $username = $payload->username;
    $password = $payload->password;

    $query = $conn->query(
        "SELECT * FROM `users` 
        WHERE `username` LIKE '$username' AND 
        `password` LIKE '$password'"
    );
    $result = $query->fetch();

    if ($result) {
        http_response_code(200);
        echo $result['token'];
    } else {
        http_response_code(400);
        echo "Invalid username or password";
    }
}


function check()
{
    $payload = file_get_contents("php://input");
    $payload = json_decode($payload);

    $conn = getDB();
    $result = $conn->query(
        "SELECT * FROM `users` WHERE `token` LIKE '$payload->token'"
    );
    $result = $result->fetch();

    if ($result) {
        http_response_code(200);
    } else {
        http_response_code(400);
    }
}
