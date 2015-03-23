<?php

// fetch all the menu information for a given month

$year      = isset($_GET['year'])  ? $_GET['year']  + 0 : date('Y');
$month     = isset($_GET['month']) ? $_GET['month'] + 0 : date('n');
$month     = $month % 12; if (!$month) $month = 12;

$db = new SQLite3('../db/menu.db');
if (!$db)
    die("Opening database failed");

$st = $db->prepare('SELECT * FROM menu WHERE year=? AND month=?');
$st->bindValue(1, $year,  SQLITE3_INTEGER);
$st->bindValue(2, $month, SQLITE3_INTEGER);
$results = $st->execute();

// turn into a JSON map
$map = array();
while ($row = $results->fetchArray()) {
    $map[ $row['month'].'-'.$row['month'].'-'.$row['year'] ] = array(
        'breakfast' => $row['breakfast'],
        'lunch'     => $row['lunch'],
        'salad'     => $row['salad'],
        'timestamp' => $row['set_timestamp']
    );
}

echo json_encode($map);

?>