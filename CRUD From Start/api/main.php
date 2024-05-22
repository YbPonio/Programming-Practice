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
    public $token;

    public $username;
    public $password;

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
        try {
            $query = $this->conn->query("
        INSERT INTO `users` (`id`, `firstname`, `lastname`, `age`, `token`) VALUES (NULL, '$this->firstname', '$this->lastname', '$this->age', '$this->token');
        ");
        } catch (PDOException $e) {
            if ($e->errorInfo[1] == 1062) {
                return "User already exists";
            }
        }

        return "User added successfully";
    }

    function delete()
    {
        try {
            $query = $this->conn->query("DELETE FROM `users` WHERE `id` = $this->id");
            return "User deleted successfully ";
        } catch (PDOException $exception) {
            return "user not deleted";
        }
    }

    function edit()
    {
        try {
            $query = $this->conn->query("UPDATE `users` SET `firstname` = '$this->firstname', `lastname` = '$this->lastname', `age` = '$this->age' WHERE `users`.`id` = $this->id;");
            echo "User updated successfully";
        } catch (PDOException $e) {
            if ($e->errorInfo[1] == 1062) {
                return "Cant use deplicate username";
            }
        }
    }

    function token()
    {
        $token = bin2hex(random_bytes(12));
        return $token;
    }

    function login()
    {
        $query = $this->conn->query("SELECT * FROM `users` WHERE `firstname` LIKE '$this->username' AND `lastname` LIKE '$this->password'");
        $result = $query->fetch();

        if ($result) {
            http_response_code(200);
            echo json_encode($result);
        } else {
            http_response_code(401);
            echo "Login failed";
        }
    }

    function check()
    {
        $query = $this->conn->query("SELECT * FROM `users` WHERE `token` LIKE '$this->token'");
        $result = $query->fetch();

        if ($result) {
            http_response_code(200);
            return json_encode($result);
        } else {
            http_response_code(400);
            return "No token found";
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_GET['action']) && $_GET['action'] == 'read') {
    $user = new User($db);
    $item = $user->getItem();
    echo json_encode($item);
} else if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_GET['action']) && $_GET['action'] == 'create') {
    $user = new User($db);
    $user->token = $user->token();

    $data = json_decode(file_get_contents("php://input"));
    if (!$data->firstname || !$data->lastname || !$data->age) {
        echo "Invalid request";
        return;
    }
    $user->firstname = $data->firstname;
    $user->lastname = $data->lastname;
    $user->age = $data->age;

    $item = $user->create();
    echo $item;
} else if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_GET['action']) && $_GET['action'] == 'delete' && isset($_GET['id'])) {
    $user = new User($db);
    $user->id = $_GET['id'];

    echo $user->delete();
} else if ($_SERVER['REQUEST_METHOD'] == "POST" && isset($_GET['action']) && $_GET['action'] == 'edit') {
    $user = new User($db);
    $data = json_decode(file_get_contents("php://input"));

    $user->id = $data->id;
    $user->firstname = $data->firstname;
    $user->lastname = $data->lastname;
    $user->age = $data->age;

    echo $user->edit();
} else if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_GET["action"]) && $_GET["action"] == "login") {
    $user = new User($db);
    $data = json_decode(file_get_contents("php://input"));

    $user->username = $data->username;
    $user->password = $data->password;

    echo $user->login();
} else if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_GET["action"]) && $_GET["action"] == "check") {
    $user = new User($db);
    $data = json_decode(file_get_contents("php://input"));

    $user->token = $data->token;

    echo $user->check();
}
