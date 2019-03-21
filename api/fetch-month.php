<?php

require_once(__DIR__.'/../functions/date-input.php');
require_once(__DIR__.'/../functions/utils.php');

$db = new SQLite3('../db/menu.db');
if (!$db)
    die("Opening database failed");

// fetch all the menu information for a given month

$st = $db->prepare('SELECT * FROM menu WHERE year=? AND month=?');
if ($st) {
    $st->bindValue(1, $year,  SQLITE3_INTEGER);
    $st->bindValue(2, $month, SQLITE3_INTEGER);
    $results = $st->execute();

    // turn into a JSON map
    $map = array('success' => true);
    while ($row = $results->fetchArray()) {
        $map[ $row['month'].'-'.$row['day'].'-'.$row['year'] ] = array(
            'breakfast' => empty2null($row['breakfast']),
            'lunch'     => empty2null($row['lunch']),
            'timestamp' => empty2null($row['set_timestamp'])
        );
    }
}

// fetch arbitrary cell notes

$st = $db->prepare('SELECT * FROM cellNotes WHERE YEAR=? AND month=?');
if ($st) {
    $st->bindValue(1, $year,  SQLITE3_INTEGER);
    $st->bindValue(2, $month, SQLITE3_INTEGER);
    $results = $st->execute();

    while ($row = $results->fetchArray()) {
        // e.g. note-3-0-2016 (notes for the first empty cell in March 2016)
        $map[ 'note-'.$row['month'].'-'.$row['cellID'].'-'.$row['year'] ] = array(
            'notes'     => empty2null($row['notes']),
            'timestamp' => empty2null($row['set_timestamp'])
        );
    }
}

// fetch the footer notes for the month, if any

$st = @$db->prepare('SELECT * FROM notes WHERE year=? AND month=? LIMIT 1');
if ($st) {
    $st->bindValue(1, $year,  SQLITE3_INTEGER);
    $st->bindValue(2, $month, SQLITE3_INTEGER);
    $results = $st->execute();

    if ($row = $results->fetchArray())
        $map['notes'] = $row['notes'];
}

// fetch the top left for the month, if any

$st = @$db->prepare('SELECT * FROM topLeft ORDER BY set_timestamp DESC LIMIT 1');
if ($st) {
    $results = $st->execute();
    if ($row = $results->fetchArray())
        $map['topLeft'] = $row['notes'];
}

// DONE

$json_result = $map;
require_once('api-json.php');

?>
