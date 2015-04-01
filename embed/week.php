<?php

// fetch the whole month; we will extract
// the data we need from it.

// prevent passing parameters to fetch-month.php.
$_GET = array();

$json_silent = true;
require_once(__DIR__.'/../api/fetch-month.php');
$month_data = $json_result;

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
        $day_data = $month_data[ $date->format('n-j-Y') ];
        
        // fill in missing data with N/A
        $defaults = array('breakfast' => 'N/A', 'lunch' => 'N/A');
        $day_data = $day_data ? array_merge($defaults, $day_data) : $defaults;
        
        // lunch + salad
        $lunch = $day_data['lunch'];
        if (isset($day_data['salad']))
            $lunch .= "\n".$day_data['salad'];
        $lunch = str_replace("\n", "<br />", htmlentities($lunch));

        
        // breakfast
        $bfast = $day_data['breakfast'];
        $bfast = str_replace("\n", "<br />", htmlentities($bfast));
        
?>

    <tr class="title">
        <td colspan="2">
            <?php echo $date->format('l, F j'); ?>
        </td>
    </tr>
    <tr class="day">
        <td>
            <h3>Breakfast</h3>
            <?php echo $bfast; ?>
        </td>
        <td>
            <h3>Lunch</h3>
            <?php echo $bfast; ?>
        </td>
    </tr>
            
<?php } ?>
</table>
</body>
    
</html>