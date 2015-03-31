<?php

$year   = date('Y');
$month  = date('n');
$monday = new DateTime('@'.strtotime('monday this week'));
$friday = new DateTime('@'.strtotime('friday this week'));

$interval = DateInterval::createFromDateString('day');
$period = new DatePeriod($monday, $interval, $friday);
echo "period: $period\n";
print_r($period);
foreach ($period as $date) {
    echo $dt->format('Y-m-d');
}

?>