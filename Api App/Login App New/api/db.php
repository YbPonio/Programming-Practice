<?php


function getDb()
{
    $host = "localhost";
    $dbname = "ssh";
    $user = "ssh";
    $pass = "8D7[CCxZp-QT_Y5k";

    $dsn = "mysql:
    host=$host;
    dbname=$dbname;
    user=$user;
    password=$pass";

    $conn = new PDO($dsn);
    return $conn;
}

getDb();
