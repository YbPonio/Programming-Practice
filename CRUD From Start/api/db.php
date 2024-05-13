<?php

function getDB()
{
    $host = "localhost";
    $dbname = "pas";
    $username = "pas";
    $password = "4/FUvsQ_ErC.hOsy";

    $conn = new PDO("mysql: host=$host; dbname=$dbname; user=$username; password=$password");
    return $conn;
}
