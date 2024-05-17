<?php
header("Content-Type: application/json");
require("db.php");


$database = new Database();
$db = $database->getDB();

class User
{
    private $conn;

    public $id;
    public $firstname;
    public $lastname;
    public $age;

    function __construct($db)
    {
        $this->conn = $db;
    }

    function getItem()
    {
        $query = $this->conn->query("SELECT * FROM `users`");
        $result = $query->fetchAll();
        return $result;
    }

    function create()
    {
        $query = $this->conn->query("
        INSERT INTO `users` (`id`, `firstname`, `lastname`, `age`) VALUES (NULL, '$this->firstname', '$this->lastname', '$this->age');
        ");

        return "User added successfully";
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_GET['action']) && $_GET['action'] == 'read') {
    $user = new User($db);
    $item = $user->getItem();
    echo json_encode($item);
}
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_GET['action']) && $_GET['action'] == 'create') {
    $user = new User($db);
    $data = json_decode(file_get_contents("php://input"));
    $user->firstname = $data->firstname;
    $user->lastname = $data->lastname;
    $user->age = $data->age;

    $item = $user->create();
    echo $item;
}
