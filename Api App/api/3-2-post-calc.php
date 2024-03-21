<?php
$num1 = $_POST['num1'] ?? null;
$num2 = $_POST['num2'] ?? null;
$operator = $_POST['operator'] ?? null;


if ($operator == "+") {
    $result = $num1 + $num2;
} elseif ($operator == "-") {
    $result = $num1 - $num2;
} elseif ($operator == "/") {
    $result = $num1 / $num2;
} elseif ($operator == "*") {
    $result = $num1 * $num2;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculator Post</title>
</head>

<body>
    <form action="" method="post">
        <h1>The result is: <?= $result ?? null ?></h1>
        <input name="num1" type="number" placeholder="Num 1" required>
        <input name="num2" type="number" placeholder="Num 2" required>
        <input name="operator" type="submit" value="+">
        <input name="operator" type="submit" value="-">
        <input name="operator" type="submit" value="/">
        <input name="operator" type="submit" value="*">
    </form>
</body>

</html>