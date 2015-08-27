<?php

function previousMonth($root = 'administrator.php') {
    global $year, $month;
    $newYear  = $year;
    $newMonth = $month;
    if ($month == 1) {
        $newYear--;
        $newMonth = 12;
    }
    else
        $newMonth--;
    $ref = isset($_GET['ref']) ? '&ref='.$_GET['ref'] : '';
    return "$root?year=$newYear&month=$newMonth$ref";
}

function nextMonth($root = 'administrator.php') {
    global $year, $month;
    $newYear  = $year;
    $newMonth = $month;
    if ($month == 12) {
        $newYear++;
        $newMonth = 1;
    }
    else
        $newMonth++;
    $ref = isset($_GET['ref']) ? '&ref='.$_GET['ref'] : '';
    return "$root?year=$newYear&month=$newMonth$ref";
}

?>