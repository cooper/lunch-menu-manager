<?php
phpinfo();

$db = new SQLiteDatabase('../db/menu.db');
if (!$db)
    die("Opening database failed");

$db->query('CREATE TABLE IF NOT EXISTS menu (year INT, month INT, day INT, breakfast TEXT, lunch TEXT, salad TEXT, set_timestamp INT)');

// delete any previous records
$st = @$db->prepare('DELETE FROM menu WHERE year=:year AND month=:month AND day=:day');
$st->bindValue(':year',  intval($_POST['year']),     SQLITE3_INTEGER);
$st->bindValue(':month', intval($_POST['month']),    SQLITE3_INTEGER);
$st->bindValue(':day',   intval($_POST['day']),      SQLITE3_INTEGER);
$st->execute();

// insert the new records
$db->prepare('INSERT INTO menu (year, month, day, breakfast, lunch, salad, set_timestamp) VALUES(:year, :month, :day, :breakfast, :lunch, :salad, :timestamp)');
$st->bindValue(':year',         intval($_POST['year']),  SQLITE3_INTEGER);
$st->bindValue(':month',        intval($_POST['month']), SQLITE3_INTEGER);
$st->bindValue(':day',          intval($_POST['day']),   SQLITE3_INTEGER);
$st->bindValue(':breakfast',    $_POST['breakfast'],     SQLITE3_TEXT   );
$st->bindValue(':lunch',        $_POST['lunch'],         SQLITE3_TEXT   );
$st->bindValue(':salad',        $_POST['salad'],         SQLITE3_TEXT   );
$st->execute();

?>