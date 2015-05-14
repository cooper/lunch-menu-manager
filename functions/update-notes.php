<?php

$LOGIN_REQUIRED = true;
require_once('session.php');

$db = new SQLite3('../db/menu.db');
if (!$db)
    die("Opening database failed");

foreach (array('year', 'month', 'notes') as $required) {
    if (isset($_POST[$required]))
        continue;
    die("Missing required option '$required'");
}

$db->query('CREATE TABLE IF NOT EXISTS notes (year INT, month INT, notes TEXT, set_timestamp INT)');

// delete any previous records
$st = @$db->prepare('DELETE FROM notes WHERE year=? AND month=?');
$st->bindValue(1, intval($_POST['year']),     SQLITE3_INTEGER);
$st->bindValue(2, intval($_POST['month']),    SQLITE3_INTEGER);
$st->execute();

// insert the new records
$st = $db->prepare('INSERT INTO notes (year, month, notes) VALUES (?, ?, ?)');
$st->bindValue(1, intval($_POST['year']),  SQLITE3_INTEGER);
$st->bindValue(2, intval($_POST['month']), SQLITE3_INTEGER);
$st->bindValue(3, $_POST['notes'],         SQLITE3_TEXT   );
$st->bindValue(4, time(),                  SQLITE3_INTEGER);
$st->execute();

if ($db->lastErrorCode())
    echo json_encode(array(
        'error'   => $db->lastErrorMsg(),
        'success' => false
    ));
else
    echo json_encode(array('success' => true));

?>