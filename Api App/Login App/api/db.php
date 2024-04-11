<?php

function getDB()
{
    $host = "localhost";
    $dbname = "fabs";
    $user = "fabs";
    $pass = "PmGzcScNHI7_/lA@";

    $dsn =
        "mysql:
            host=$host;
            dbname=$dbname;
            user=$user;
            password=$pass;
        ";

    $conn = new PDO($dsn);
    return $conn;
}

getDB();
