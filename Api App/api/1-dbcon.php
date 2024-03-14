<?php

try {
    $conn = new PDO('mysql:
    host=localhost;
    dbname=fabs;
    user=fabs;
    password=PmGzcScNHI7_/lA@;
    ');

    // echo "Connected Successfully", '<br>';
} catch (PDOException $e) {
    echo $e;
}

$data = $conn->query('SELECT * FROM inventory');

while ($result = $data->fetch()) {
    // echo "$result[id] $result[name] $result[price] $result[qty] $result[category] $result[expiry_date]", '<br>';


}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <table>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Expiry Date</th>
        </tr>
        <tbody id="tableData">

        </tbody>
    </table>
</body>

<script>
</script>

</html>