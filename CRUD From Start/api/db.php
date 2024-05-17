<?php
class Database
{
    private $host = "localhost";
    private $dbname = "pas";
    private $username = "pas";
    private $password = "53WZe!ZQs8!n3a-1";
    public $conn;

    public function getDB()
    {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=$this->host;dbname=$this->dbname", $this->username, $this->password);
            $this->conn->exec("set names utf8");
        } catch (PDOException $exception) {
            echo "Conncection error: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
