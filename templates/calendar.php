<?php

require_once(__DIR__.'/../functions/date-input.php');

function draw_calendar ($month, $year) {
    global $month, $year;
    
	$running_day       = date('w', mktime(0, 0, 0, $month, 1, $year));
	$days_in_month     = date('t', mktime(0, 0, 0, $month, 1, $year));
	$days_in_this_week = 1;
    $m_f_in_this_week  = 1;
	$day_counter       = 0;
    $weeks_in_month    = 0;

    $calendar = '';
    
	/* row for week one */

    // if the month starts on a saturday,
    // just skip the entire first week
    $skip_first_week = false;
    if ($running_day != 6) {
        $calendar .= '<tr>';
    }
    else {
        $skip_first_week = true;
    }
    
    // blank days
    if (!$skip_first_week)
	for ($x = 0; $x < $running_day; $x++) {
        if ($x != 0 && $x != 6) {
            $calendar.= '<td></td>';
            $m_f_in_this_week++;
        }
		$days_in_this_week++;
    }
    
    $month_over = false;
	for ($list_day = 1; $list_day <= $days_in_month; $list_day++) {
        
        // ignore Saturday and Sunday
        if ($running_day != 0 && $running_day != 6) {
            $is_today = "$year-$month-$list_day" == date('Y-n-j');
            $today_html = $is_today ? ' today' : '';
            $calendar.= '<td data-year="'.$year.'" data-month="'.$month.'" data-day="'.$list_day.'" data-running-day="'.$running_day.'" class="edit-button'.$today_html.'">';
            $calendar .= '<span class="day-number">'.$list_day.'</span>';
            $calendar .= '<span class="menu-items"></span>';
            $calendar .= '</td>';
            $m_f_in_this_week++;
        }
    
        // end of the week
		if ($running_day == 6) {
            
            // if we're skipping, skip,
            // and unset the skipper
            if ($skip_first_week) {
                $skip_first_week = false;
            }
            
            // otherwise, close the week
            // and increase the week count
            else {
                $calendar.= '</tr>';
                $weeks_in_month++;
            }
            
            // start another row, unless this is the last day
            if (($day_counter + 3) >= $days_in_month)
                $month_over = true; // force end of month
            else
                $calendar.= '<tr>';
            
			$running_day = -1;
			$days_in_this_week = 0;
            $m_f_in_this_week  = 0;
        }
        
		$days_in_this_week++;
        $running_day++;
        $day_counter++;
        
        if ($month_over)
            break;
        
    }

	// empty days at the end
	if (!$month_over && $m_f_in_this_week < 5) {
		for ($x = 1; $x <= (5 - $m_f_in_this_week); $x++) {
			$calendar.= '<td></td>';
        }
    }
    
    // if we haven't ended the week, do so
    if (substr($calendar, -5) != '</tr>') {
        $calendar.= '</tr>';
        $weeks_in_month++;
    }
    
    // inject another week if there aren't enough
    if ($weeks_in_month < 5) {
        $calendar .= '<tr>';
        $calendar .= '<td></td>';
        $calendar .= '<td></td>';
        $calendar .= '<td></td>';
        $calendar .= '<td></td>';
        $calendar .= '<td></td>';
        $calendar .= '</tr>';
    }
    
    return $calendar;
}

$mode = isset($_GET['mode']) && $_GET['mode'] == 'breakfast' ?
    'breakfast' : 'lunch';
$consistent = isset($_GET['ref']) && $_GET['ref'] == 'week';

?>

<table class="lunch-calendar mode-<?php echo $mode; if (isset($administrator)) echo ' administrator'; ?>" data-year="<?= $year ?>" data-month="<?= $month ?>">
    <caption>
        <span class="right" id="caption-mode"><?= ucfirst($mode) ?> menu</span>
        <span class="left" id="caption-left"></span>
        <?= "$monthName $year" ?>
    </caption>
    <thead>
        <tr<?php if ($consistent) echo ' class="consistent"' ?>>
            <td>Monday</td>
            <td>Tuesday</td>
            <td>Wednesday</td>
            <td>Thursday</td>
            <td>Friday</td>
        </tr>
    </thead>
    <tbody>
        <?= draw_calendar($month, $year) ?>
    </tbody>
</table>
<?php
    echo "admin:$administrator pdf:$pdf";
    if (!isset($administrator) && !isset($pdf))
        require(__DIR__.'/footer-navigation.php');
?>
<div id="menu-notes">
</div>