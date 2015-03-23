<?php

// years  are YYYY
// months are 1-12
// days   are 1-31

$year      = isset($_GET['year'])  ? $_GET['year']  + 0 : date('Y');
$month     = isset($_GET['month']) ? $_GET['month'] + 1 : date('n');
$month     = $month % 12;
$monthName = date('F', mktime(0, 0, 0, $month, 10));

function draw_calendar ($month, $year) {
	$running_day       = date('w', mktime(0, 0, 0, $month, 1, $year));
	$days_in_month     = date('t', mktime(0, 0, 0, $month, 1, $year));
	$days_in_this_week = 1;
    $m_f_in_this_week  = 1;
	$day_counter       = 0;

    $calendar = '';
    
	/* row for week one */
	$calendar.= '<tr>';

    // if the month starts on a saturday or sunday,
    // just skip the entire first week
    if ($running_day == 0 || $running_day == 6) {
        $running_day = 1;
    }
    
    // blank days
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
            $calendar.= '<td>';
            $calendar.= '<span class="day-number">'.$list_day.'</span>';
            // TODO: add the lunch stuff
            $calendar .= '</td>';
            $m_f_in_this_week++;
        }
    
        // end of the week
		if ($running_day == 6) {
			$calendar.= '</tr>';
            
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

	/* final row */
	$calendar.= '</tr>';

	/* all done, return result */
	return $calendar;
}

?>

<table class="lunch-calendar">
    <caption>
        <?php echo("$monthName $year"); ?>
        &mdash;
        <?php echo($breakfast ? 'Breakfast' : 'Lunch'); ?>
    </caption>
    <thead>
        <tr>
            <td>Monday</td>
            <td>Tuesday</td>
            <td>Wednesday</td>
            <td>Thursday</td>
            <td>Friday</td>
        </tr>
    </thead>
    <tbody>
        <?php echo draw_calendar($month, $year); ?>
    </tbody>
</table>