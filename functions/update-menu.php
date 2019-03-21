<?php

$LOGIN_REQUIRED = true;
require_once('session.php');

$db = new SQLite3('../db/menu.db');
if (!$db)
    die("Opening database failed");

foreach (array('year', 'month', 'day', 'breakfast', 'lunch') as $required) {
    if (isset($_POST[$required]))
        continue;
    die("Missing required option '$required'");
}

$db->query('CREATE TABLE IF NOT EXISTS menu (year INT, month INT, day INT, breakfast TEXT, lunch TEXT, set_timestamp INT)');

// delete any previous records
$st = @$db->prepare('DELETE FROM menu WHERE year=? AND month=? AND day=?');
$st->bindValue(1, intval($_POST['year']),     SQLITE3_INTEGER);
$st->bindValue(2, intval($_POST['month']),    SQLITE3_INTEGER);
$st->bindValue(3, intval($_POST['day']),      SQLITE3_INTEGER);
$st->execute();

// insert the new records
$st = $db->prepare('INSERT INTO menu (year, month, day, breakfast, lunch, set_timestamp) VALUES (?, ?, ?, ?, ?, ?)');
$st->bindValue(1, intval($_POST['year']),  SQLITE3_INTEGER);
$st->bindValue(2, intval($_POST['month']), SQLITE3_INTEGER);
$st->bindValue(3, intval($_POST['day']),   SQLITE3_INTEGER);
$st->bindValue(4, $_POST['breakfast'],     SQLITE3_TEXT   );
$st->bindValue(5, $_POST['lunch'],         SQLITE3_TEXT   );
$st->bindValue(6, time(),                  SQLITE3_INTEGER);
$st->execute();

if ($db->lastErrorCode())
    echo json_encode(array(
        'error'   => $db->lastErrorMsg(),
        'success' => false
    ));
else
    echo json_encode(array('success' => true));

?>