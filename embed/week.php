<?php

// prevent passing parameters to fetch-month.php.
$_GET = array();

// fetch the previous, current, and upcoming months.

// current month
$json_silent = true;
require __DIR__.'/../api/fetch-month.php';
$month_data_1 = $json_result;

// previous month
$month = date('n') - 1;
if (!$month) $month = 12; // 1 - 1 = 0 = December
require __DIR__.'/../api/fetch-month.php';
$month_data_2 = $json_result;

// next month
$month = date('n') + 1; // could be 13, but date-input.php handles that.
require __DIR__.'/../api/fetch-month.php';
$month_data_3 = $json_result;

$month_data = array_merge($month_data_1, $month_data_2, $month_data_3);

// using Friday leaves it short one day,
// so we're actually using Saturday here.

$year   = date('Y');
$month  = date('n');
$monday = new DateTime('@'.strtotime('monday this week'));
$friday = new DateTime('@'.strtotime('saturday this week'));

// create a period from Monday to Friday with an interval of one day
$interval = DateInterval::createFromDateString('1 day');
$period = new DatePeriod($monday, $interval, $friday);

?>
<!doctype html>
<html>

<head>
    <meta charset="utf-8" />
    <link href="http://fonts.googleapis.com/css?family=Lato:100,300,400,700,900" rel="stylesheet" type="text/css" />
    <link href="../styles/red-and-black/weekly.css" rel="stylesheet" type="text/css" />
</head>
    
<body>
<table id="weekly-calendar">
<?php

    foreach ($period as $date) {
        $dstr = $date->format('n-j-Y');
        $day_data = isset($month_data[$dstr]) ? $month_data[$dstr] : array();
        
        // is this today?
        $is_today = $date->format('Y-m-d') == date('Y-m-d');
        
        // fill in missing data with N/A
        if (!isset($day_data['breakfast']))
            $day_data['breakfast'] = 'N/A';
        if (!isset($day_data['lunch']))
            $day_data['lunch'] = 'N/A';
        
        // lunch + salad
        $lunch = $day_data['lunch'];
        if (isset($day_data['salad']))
            $lunch .= "\n{$day_data['salad']} salad";
        $lunch = str_replace("\n", "<br />\n", htmlentities($lunch));

        // breakfast
        $bfast = $day_data['breakfast'];
        $bfast = str_replace("\n", "<br />\n", htmlentities($bfast));
        
?>

    <tr class="title">
        <td colspan="2">
            <?php
                echo $date->format('l, F j');
                if ($is_today) echo " &mdash; Today";
            ?>
        </td>
    </tr>
    <tr class="day<?php if ($is_today) echo " today"; ?>">
        <td>
            <h3>Breakfast</h3>
            <span style="text-transform: lowercase;">
                <?= $bfast ?>
            </span>
        </td>
        <td>
            <h3>Lunch</h3>
            <span style="text-transform: lowercase;">
                <?= $lunch ?>
            </span>
        </td>
    </tr>
       
<?php } ?>
    
    <tr class="full">
        <td colspan="2">
            <a target="_blank" href="../calendar.php?ref=week">
                Open the full menu for <?= $monthName ?> in a new tab
            </a>
        </td>
    </tr>
</table>
</body>
    
</html>