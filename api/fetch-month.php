<?php

// fetch all the menu information for a given month

require_once(__DIR__.'/../functions/date-input.php');
require_once(__DIR__.'/../functions/utils.php');

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
        'breakfast' => empty2null($row['breakfast']),
        'lunch'     => empty2null($row['lunch']),
        'salad'     => empty2null($row['salad']),
        'timestamp' => empty2null($row['set_timestamp'])
    );
}

// fetch the notes for the month, if any

$st = $db->prepare('SELECT * FROM notes WHERE year=? AND month=?');
$st->bindValue(1, $year,  SQLITE3_INTEGER);
$st->bindValue(2, $month, SQLITE3_INTEGER);
$results = $st->execute();

if ($row = $results->fetchArray())
    $map['notes'] = print_r($row, true);//$row['notes'];

$json_result = $map;
require_once('api-json.php');

?>