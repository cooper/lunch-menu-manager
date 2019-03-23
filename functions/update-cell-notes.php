<?php

$LOGIN_REQUIRED = true;
require_once('session.php');

// demo mode
if (isset($_SESSION['demo']))
    die(json_encode(array('success' => true)));

$db = new SQLite3('../db/menu.db');
if (!$db)
    die("Opening database failed");

foreach (array('year', 'month', 'cellID', 'notes') as $required) {
    if (isset($_POST[$required]))
        continue;
    die("Missing required option '$required'");
}

$db->query('CREATE TABLE IF NOT EXISTS cellNotes (year INT, month INT, cellID INT, notes TEXT, set_timestamp INT)');

// delete any previous records
$st = @$db->prepare('DELETE FROM cellNotes WHERE year=? AND month=? AND cellID=?');
$st->bindValue(1, intval($_POST['year']),     SQLITE3_INTEGER);
$st->bindValue(2, intval($_POST['month']),    SQLITE3_INTEGER);
$st->bindValue(3, intval($_POST['cellID']),   SQLITE3_INTEGER);
$st->execute();

// insert the new records
$st = $db->prepare('INSERT INTO cellNotes (year, month, cellID, notes, set_timestamp) VALUES (?, ?, ?, ?, ?)');
$st->bindValue(1, intval($_POST['year']),   SQLITE3_INTEGER);
$st->bindValue(2, intval($_POST['month']),  SQLITE3_INTEGER);
$st->bindValue(3, intval($_POST['cellID']), SQLITE3_INTEGER);
$st->bindValue(4, $_POST['notes'],          SQLITE3_TEXT   );
$st->bindValue(5, time(),                   SQLITE3_INTEGER);
$st->execute();

if ($db->lastErrorCode())
    echo json_encode(array(
        'error'   => $db->lastErrorMsg(),
        'success' => false
    ));
else
    echo json_encode(array('success' => true));

?>
