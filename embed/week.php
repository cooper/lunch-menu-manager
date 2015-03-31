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
    <link href="http://fonts.googleapis.com/css?family=Lato:100,300,400,700,900" rel="stylesheet" type="text/css" />
    <link href="../styles/red-and-black/weekly.css" rel="stylesheet" type="text/css" />
</head>
    
<body>
        <table id="weekly-calendar">
<?php

    foreach ($period as $date) {
        $day_data = $month_data[ $date->format('n-j-Y') ];
        if (!$day_data) $day_data = array();
        
        // lunch + salad
        $lunch = $day_data['lunch'];
        if (isset($lunch)) {
            $salad = $day_data['salad'];
            if (isset($salad))
                $lunch .= "\n".$salad;
            $lunch = str_replace("\n", "<br />", htmlentities($lunch));
        }
        else $lunch = 'N/A';
        
        // breakfast
        $bfast = $day_data['breakfast'];
        if (isset($bfast))
            $bfast = str_replace("\n", "<br />", htmlentities($bfast));
        else $bfast = 'N/A';
        
?>

            <tr class="title">
                <td colspan="2">
                    <?php echo $date->format('l, F j'); ?>
                </td>
            </tr>
            <tr class="day">
                <td>
                    <h3>Breakfast</h3>
                    <?php echo $bfast_html; ?>
                </td>
                <td>
                    <h3>Lunch</h3>
                    <?php echo $lunch_html; ?>
                </td>
            </tr>
            
<?php } ?>
        </table>
</body>
    
</html>