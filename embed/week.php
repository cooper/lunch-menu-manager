<?php

$year   = date('Y');
$month  = date('n');
$monday = new Date(strtotime('monday this week'));
$friday = new Date(strtotime('friday this week'));

$interval = DateInterval::createFromDateString('day');
$period = DatePeriod($monday, $interval, $friday);
foreach ($period as $date) {
    echo $dt->format('Y-m-d');
}

?>