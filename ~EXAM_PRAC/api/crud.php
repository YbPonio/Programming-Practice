<?php
header("Content-Type: application/json");
require("db.php");

$action = $_GET["action"] ?? null;

if ($action == "create") {
    create();
} else if ($action == "read") {
    read();
} else if ($action == "update") {
    update();
} else if ($action == "delete") {
    delete();
} else {
    echo json_encode(["error" => "Invalid action"]);
}

function read()
{
    $conn = getDB();

    $query = $conn->query("
    SELECT users.id, users.username, users.password,
    COALESCE(students.firstname, null) AS firstname,
    COALESCE(students.lastname, null) AS lastname,
    COALESCE(students.age, null) AS age,
    COALESCE(gender.gender_type, null) AS gender_type
    FROM users
    LEFT JOIN students ON users.student_id = students.id
    LEFT JOIN gender ON students.gender_id = gender.id
    ORDER BY `users`.`id` ASC;
    ");
    $result = $query->fetchAll();

    echo json_encode($result);
}

function create()
{
    $conn = getDB();
    $data = json_decode(file_get_contents("php://input"));

    try {
        $conn->query("
        INSERT INTO `students` (`id`, `gender_id`, `firstname`, `lastname`, `age`) VALUES (NULL, $data->gender, '$data->firstname', '$data->lastname', '$data->age');
        ");
        $student_id = $conn->lastInsertId();
        $token = token();

        $query = $conn->query("
        INSERT INTO `users` (`id`, `student_id`, `username`, `password`, `token`) VALUES (NULL, $student_id, '$data->username', '$data->password', '$token');
        ");
        http_response_code(201);
        echo json_encode(["success" => true]);
    } catch (PDOException $e) {
        http_response_code(400);
        if ($e->errorInfo[1] == 1062) {
            echo json_encode(["error" => "Username already exists"]);
        } else {
            echo json_encode(["error" => "An error occurred"]);
        }
    }
}

function token()
{
    return bin2hex(random_bytes(16));
}
