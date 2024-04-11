<?php

$action = $_GET['action'] ?? null;

if ($action == "login") {
    login();
}

function login()
{
    $payload = file_get_contents("php://input");
    $payload = json_decode($payload);

    print_r($payload);
}
