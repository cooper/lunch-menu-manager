<?php

$year   = date('Y');
$month  = date('n');
$monday = date('j', strtotime('monday this week'));
$friday = date('j', strtotime('friday this week'));

foreach (range($monday, $friday) as $day) {
    echo "$year-$month-$day<br>";
}

?>