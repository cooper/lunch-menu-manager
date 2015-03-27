<?php

// fetch all the menu information for a given month

require_once('../functions/date-input.php');

$db = new SQLite3('../db/menu.db');
if (!$db)
    die("Opening database failed");

$st = $db->prepare('SELECT * FROM menu WHERE year=? AND month=?');
$st->bindValue(1, $year,  SQLITE3_INTEGER);
$st->bindValue(2, $month, SQLITE3_INTEGER);
$results = $st->execute();

// turn into a JSON map
$map = array('success' => true);
while ($row = $results->fetchArray()) {
    $map[ $row['month'].'-'.$row['day'].'-'.$row['year'] ] = array(
        'breakfast' => $row['breakfast'],
        'lunch'     => $row['lunch'],
        'salad'     => $row['salad'],
        'timestamp' => $row['set_timestamp']
    );
}

$json_result = json_encode($map);
require_once('api-json.php');

?>