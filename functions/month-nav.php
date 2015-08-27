<?php

function previousMonthNum() {
    global $year, $month;
    $newYear  = $year;
    $newMonth = $month;
    if ($month == 1) {
        $newYear--;
        $newMonth = 12;
    }
    else
        $newMonth--;
    return array($newMonth, $newYear);
}

function previousMonth($root = 'administrator.php') {
    $prev = previousMonthNum();
    $newMonth = $prev[0];
    $newYear = $prev[1];
    $ref = isset($_GET['ref']) ? '&ref='.$_GET['ref'] : '';
    return "$root?year=$newYear&month=$newMonth$ref";
}

function nextMonthNum() {
    global $year, $month;
    $newYear  = $year;
    $newMonth = $month;
    if ($month == 12) {
        $newYear++;
        $newMonth = 1;
    }
    else
        $newMonth++;
    return array($newMonth, $newYear);
}

function nextMonth($root = 'administrator.php') {
    $next = nextMonthNum();
    $newMonth = $next[0];
    $newYear = $next[1];
    $ref = isset($_GET['ref']) ? '&ref='.$_GET['ref'] : '';
    return "$root?year=$newYear&month=$newMonth$ref";
}

?>