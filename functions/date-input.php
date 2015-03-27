<?php

$year      = isset($_GET['year'])  ? intval($_GET['year'])  : date('Y');
$month     = isset($_GET['month']) ? intval($_GET['month']) : date('n');
$month     = $month % 12; if (!$month) $month = 12;
$monthName = date('F', mktime(0, 0, 0, $month, 10));

if ($month <= 0 || $year <= 0)
    die('Invalid date selection');

?>