<?php
header("Content-Type: application/json");

require("db.php");

$action = $_GET["action"];

if ($action == "login") {
    login();
} elseif ($action == "check") {
    check();
} elseif ($action == "register") {
    register();
} elseif ($action == "read") {
    userCheck();
} elseif ($action == "delete") {
    delete();
} elseif ($action == "update") {
    update();
} elseif ($action == "reset") {
    resetPass();
}

function login()
{
    $conn = getDb();
    $payload = json_decode(file_get_contents("php://input"));

    $query = $conn->query("SELECT * FROM `user` WHERE `username` LIKE '$payload->username' AND `password` LIKE '$payload->password'");

    $result = $query->fetch();

    if ($result) {
        http_response_code(200);
        echo json_encode($result["token"]);
    } else {
        http_response_code(400);
        echo json_encode("Invalid username or password");
    }
}


function check()
{
    $conn = getDb();
    $payload = json_decode(file_get_contents("php://input"));

    $query = $conn->query("SELECT * FROM `user` WHERE `token` LIKE '$payload->token'");

    $result = $query->fetch();

    if ($result) {
        http_response_code(200);
        echo json_encode($result);
    } else {
        http_response_code(400);
    }
}

function register()
{
    $conn = getDb();
    $payload = json_decode(file_get_contents("php://input"));

    $account = $conn->query("SELECT * FROM `user` WHERE `username` LIKE '$payload->username'")->fetch();

    if ($account) {
        http_response_code(400);
        echo json_encode("Account already exists");
        return;
    }

    $query = $conn->query("INSERT INTO `user` (`name`, `username`, `password`, `token`, `access`) VALUES ('$payload->name', '$payload->username', '$payload->password', '$payload->token', 'user')");

    $result = $conn->query("SELECT * FROM `user` WHERE `token` LIKE '$payload->token'");
    $result = $result->fetch();

    if ($query) {
        http_response_code(200);
        echo json_encode($result["token"]);
    } else {
        http_response_code(400);
    }
}

function userCheck()
{
    $conn = getDb();
    $query = $conn->query("SELECT * FROM `user`  WHERE `access` LIKE 'user' ORDER BY `access` ASC");

    $result = $query->fetchAll();
    echo json_encode($result);
}

function delete()
{
    $conn = getDb();
    $payload = json_decode(file_get_contents("php://input"));

    $query = $conn->query("DELETE FROM user WHERE `user`.`id` = $payload->id");
    $result = $query->fetch();

    echo "User Deleted";
}


function update()
{
    $conn = getDb();
    $payload = json_decode(file_get_contents("php://input"));

    $query = $conn->query("
    UPDATE `user` SET `name` = '$payload->name', `username` = '$payload->username', `email` = '$payload->email', `image` = '$payload->image', `gender` = '$payload->gender', `number` = '$payload->number', `date` = '$payload->date', `address` = '$payload->address' WHERE `user`.`id` = $payload->id;
    ");

    $result = $query->fetch();
    echo "User Updated";
}


function resetPass()
{
    $conn = getDb();
    $payload = json_decode(file_get_contents("php://input"));

    $email = $conn->query("SELECT * FROM `user` WHERE `id` = $payload->id AND `email` LIKE '$payload->email'")->fetch();

    if ($email) {
        if ($payload->password == $payload->secondPass) {
            $query = $conn->query("UPDATE `user` SET `password` = '$payload->password' WHERE `user`.`id` = $payload->id;")->fetch();

            echo "Password Updated";
        } else {
            echo "Password does not match";
        }
    } else {
        echo "Email does not match";
    }
}
