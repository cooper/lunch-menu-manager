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
    return "$root?year=$newYear&month=$newMonth";
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
    return "$root?year=$newYear&month=$newMonth";
}

?>