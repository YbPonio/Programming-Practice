<?php
try{
    $handler = new PDO('mysql:host=localhost;dbname=fabs', 'fabs' , 'PmGzcScNHI7_/lA@');
    $handler->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch(PDOException $e) {
    // die("Soory, please try again!");
    echo $e->getMessage();
}

$data = $handler->query('SELECT * FROM inventory');

while ($result = $data->fetch()) {
    echo $result['name'], '<br>';
}


// $result = $data->fetch();
// echo '<pre>', print_r($result), '</pre>';


?>