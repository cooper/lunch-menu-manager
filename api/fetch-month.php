<?php

// fetch all the menu information for a given month

$year      = isset($_GET['year'])  ? $_GET['year']  + 0 : date('Y');
$month     = isset($_GET['month']) ? $_GET['month'] + 0 : date('n');
$month     = $month % 12; if (!$month) $month = 12;

$db = new SQLite3('../db/menu.db');
if (!$db)
    die("Opening database failed");

$st = $db->prepare('SELECT * FROM menu WHERE year=? AND month=?');
$st->bindValue(1, $year, SQLITE3_INTEGER);
$st->bindValue(2, $year, SQLITE3_INTEGER);
$results = $st->execute();
print_r($results);

echo json_encode(array(
    '3-2-2015' => array('breakfast' => 'a1', 'lunch' => 'a2'),
    '3-3-2015' => array('breakfast' => 'b1', 'lunch' => 'b2'),
    '3-4-2015' => array('breakfast' => 'c1', 'lunch' => 'c2')
));

?>