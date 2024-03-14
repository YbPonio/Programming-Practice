<?php
$num1 = $_GET['num1'] ?? null;
$num2 = $_GET['num2'] ?? null;
$operator = $_GET['operator'] ?? null;



if ($operator == 'add') {
    $result = $num1 + $num2;
    echo "The Sum of $num1 and $num2 is $result";
} elseif ($operator == 'multiply') {
    $result = $num1 * $num2;
    echo "The Product of $num1 and $num2 is $result";
} elseif ($operator == 'subtract') {
    $result = $num1 - $num2;
    echo "The Difference of $num1 and $num2 is $result";
} elseif ($operator == 'divide') {
    $result = $num1 / $num2;
    echo "The Quotient of $num1 and $num2 is $result";
} else {
    echo "Try Again";
}
