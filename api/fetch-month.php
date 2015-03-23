<?php

// fetch all the menu information for a given month

$year      = isset($_GET['year'])  ? $_GET['year']  + 0 : date('Y');
$month     = isset($_GET['month']) ? $_GET['month'] + 0 : date('n');
$month     = $month % 12;

echo json_encode(array(
    '3-2-2015' => array('breakfast' => 'a1', 'lunch' => 'a2'),
    '3-3-2015' => array('breakfast' => 'b1', 'lunch' => 'b2'),
    '3-4-2015' => array('breakfast' => 'c1', 'lunch' => 'c2')
));

?>