<?php
header("Content-Type: application/json");

function getDB()
{
    $host = "localhost";
    $dbname = "sas";
    $user = "sas";
    $pass = "mAe6DvM5hmDFh2qK";

    try {
        $conn = new PDO("mysql: host=$host; dbname=$dbname", $user, $pass);

        return $conn;
    } catch (PDOException $e) {
        return json_encode(["error" => $e->getMessage()]);
    }

    return $conn;
}
