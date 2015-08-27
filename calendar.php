<?php

$theme = isset($_SESSION['theme']) ? $_SESSION['theme'] : 'red-and-black';
$pdf = isset($_GET['pdf']) ? true : null;

function previousMonth() {
    $ref = isset($_GET['ref']) ? $_GET['ref'] : '';
    global $year, $month;
    $newYear  = $year;
    $newMonth = $month;
    if ($month == 1) {
        $newYear--;
        $newMonth = 12;
    }
    else
        $newMonth--;
    return "calendar.php?year=$newYear&month=$newMonth&ref=$ref";
}

function nextMonth() {
    $ref = isset($_GET['ref']) ? $_GET['ref'] : '';
    global $year, $month;
    $newYear  = $year;
    $newMonth = $month;
    if ($month == 12) {
        $newYear++;
        $newMonth = 1;
    }
    else
        $newMonth++;
    return "calendar.php?year=$newYear&month=$newMonth&ref=$ref";
}

?>
<!doctype html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Menu calendar</title>
    <link href="styles/calendar.css" type="text/css" rel="stylesheet" />
    <link href="styles/<?= $theme ?>/calendar.css" type="text/css" rel="stylesheet" />
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,600" rel="stylesheet" type="text/css" />
    <link rel="icon" type="image/png" href="images/favicon.png" />
    <script type="text/javascript" src="scripts/mootools.js"></script>
    <script type="text/javascript" src="scripts/calendar.js"></script>
</head>
<body>
    <?php
        require_once('templates/calendar.php');
    ?>
</body>
</html>