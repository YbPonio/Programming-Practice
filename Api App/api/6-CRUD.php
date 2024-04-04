<?php
header("Content-type: application/json");

$host = "localhost";
$dbname = "fabs";
$user = "fabs";
$pass = "PmGzcScNHI7_/lA@";
$search = $_GET['search'] ?? null;
$status = $_GET['status'] ?? 0;
$action = $_GET['action'] ?? null;

try {
    $dsn =
        "mysql:
            host=$host;
            dbname=$dbname;
            user=$user;
            password=$pass;
        ";

    $conn = new PDO($dsn);
} catch (Exception $e) {
    echo $e;
}
$post = file_get_contents("php://input") ?? null;
$post = json_decode($post) ?? null;


if ($action == "createNew") {
    $name = $post->name ?? null;
    $price = $post->price ?? null;
    $quantity = $post->quantity ?? null;
    $category = $post->category ?? null;
    $expiryDate = $post->expiryDate ?? null;

    $query = $conn->query("INSERT INTO `inventory`(`id`, `name`, `price`, `qty`, `category`, `expiry_date`) VALUES ('null','$name','$price','$quantity','$category','$expiryDate')");

    echo json_encode($query);
} elseif ($action == "updateData") {
    $name = $post->name;
    $price = $post->price;
    $qty = $post->quantity;
    $category = $post->category;
    $expiry_date = $post->expiryDate;
    $item_id = $post->id;


    $query = $conn->query("UPDATE `inventory` SET `name` = '$name', `price` = '$price', `qty` = '$qty', `category` = '$category', `expiry_date` = '$expiry_date' WHERE `inventory`.`id` = $item_id;");
} elseif ($action == "deleteRow") {
    $itemId = $post->id ?? null;

    $conn->query("DELETE FROM `inventory` WHERE `inventory`.`id` = $itemId");
} elseif ($action == "softDelete") {
    $id = $post->id;

    $conn->query("UPDATE `inventory` SET `status` = '1' WHERE `inventory`.`id` = $id;");

    echo json_encode("Item deleted successfully");
} elseif ($action == "restoreRow") {
    $id = $post->id;

    $conn->query("UPDATE `inventory` SET `status` = '0' WHERE `inventory`.`id` = $id;");

    echo json_encode("Item restored successfully");
} else {
    $query = $conn->query(
        "SELECT * FROM `inventory` 
        WHERE  (`name` LIKE '%$search%' OR 
                `id` = '$search' OR 
                `category` LIKE '%$search%' OR 
                `price` = '$search' OR 
                `qty` = '$search' OR 
                `expiry_date` LIKE '%$search%') AND
                `status` = $status
        ORDER BY `id` ASC"
    );
    $result = $query->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result);
}
