<?php

// fetch the whole month; we will extract
// the data we need from it.

// prevent passing parameters to fetch-month.php.
$_GET = array();

$json_silent = true;
require_once(__DIR__.'/../api/fetch-month.php');
$month_data = $json_result;
print_r($month_data);

// using Friday leaves it short one day,
// so we're actually using Saturday here.

$year   = date('Y');
$month  = date('n');
$monday = new DateTime('@'.strtotime('monday this week'));
$friday = new DateTime('@'.strtotime('saturday this week'));

// create a period from Monday to Friday with an interval of one day
$interval = DateInterval::createFromDateString('1 day');
$period = new DatePeriod($monday, $interval, $friday);

print_r($period);
foreach ($period as $date) {
    echo $date->format('Y-m-d');
    echo "\n";
    print_r($month_data[ $date->format('Y-n-j') ]);
    echo "\n\n";
}

?>