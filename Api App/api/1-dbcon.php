<?php

$hostname = "localhost";
$namedb = "fabs";
$user = "fabs";
$pass = "PmGzcScNHI7_/lA@";

try {
    $conn = new PDO("mysql:
    host=$hostname;
    dbname=$namedb;
    user=$user;
    password=$pass;
    ");

    echo "Connected Successfully";
    $data = $conn->query('SELECT * FROM inventory');
} catch (PDOException $e) {
    echo $e;
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    body {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    table {
        border: 2px solid #191919;
        border-collapse: collapse;

        tr {
            border: 2px solid #191919;
        }

        tr th,
        tr td {
            border: 2px solid #191919;
            padding: 10px;
            text-align: center;
        }

    }
</style>

<body>
    <table>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Expiry Date</th>
            <th></th>
        </tr>
        <tbody id="tableData">
            <?php
            foreach ($data as $result) {
                echo "    
                <tr>
                    <td>$result[id]</td>
                    <td>$result[name]</td>
                    <td>$result[price]</td>
                    <td>$result[qty]</td>
                    <td>$result[category]</td>
                    <td>$result[expiry_date]</td>
                    <td><button></button></td>
                </tr>";
            }
            ?>
        </tbody>
    </table>
</body>

<script>
</script>

</html>