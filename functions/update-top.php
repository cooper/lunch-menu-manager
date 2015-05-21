<?php

$LOGIN_REQUIRED = true;
require_once('session.php');

$db = new SQLite3('../db/menu.db');
if (!$db)
    die("Opening database failed");

foreach (array('notes') as $required) {
    if (isset($_POST[$required]))
        continue;
    die("Missing required option '$required'");
}

$db->query('CREATE TABLE IF NOT EXISTS topLeft (notes TEXT, set_timestamp INT)');

// insert the new records
$st = $db->prepare('INSERT INTO topLeft (notes, set_timestamp) VALUES (?, ?)');
$st->bindValue(1, $_POST['notes'],         SQLITE3_TEXT   );
$st->bindValue(2, time(),                  SQLITE3_INTEGER);
$st->execute();

if ($db->lastErrorCode())
    echo json_encode(array(
        'error'   => $db->lastErrorMsg(),
        'success' => false
    ));
else
    echo json_encode(array('success' => true));

?>