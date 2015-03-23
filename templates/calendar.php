<?php

// years  are YYYY
// months are 1-12
// days   are 1-31

$year      = isset($_GET['year'])  ? $_GET['year']  + 0 : date('Y');
$month     = isset($_GET['month']) ? $_GET['month'] + 1 : date('n');
$monthName = date('F', mktime(0, 0, 0, $month, 10));

function draw_calendar($month,$year){

	/* draw table */
	$calendar = '<table cellpadding="0" cellspacing="0" class="calendar">';

	/* table headings */
	$headings = array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
	$calendar.= '<tr class="calendar-row"><td class="calendar-day-head">'.implode('</td><td class="calendar-day-head">',$headings).'</td></tr>';

	/* days and weeks vars now ... */
	$running_day = date('w',mktime(0,0,0,$month,1,$year));
	$days_in_month = date('t',mktime(0,0,0,$month,1,$year));
	$days_in_this_week = 1;
	$day_counter = 0;
	$dates_array = array();

	/* row for week one */
	$calendar.= '<tr class="calendar-row">';

	/* print "blank" days until the first of the current week */
	for($x = 0; $x < $running_day; $x++):
		$calendar.= '<td class="calendar-day-np"> </td>';
		$days_in_this_week++;
	endfor;

	/* keep going with days.... */
	for($list_day = 1; $list_day <= $days_in_month; $list_day++):
		$calendar.= '<td class="calendar-day">';
			/* add in the day number */
			$calendar.= '<div class="day-number">'.$list_day.'</div>';

			/** QUERY THE DATABASE FOR AN ENTRY FOR THIS DAY !!  IF MATCHES FOUND, PRINT THEM !! **/
			$calendar.= str_repeat('<p> </p>',2);
			
		$calendar.= '</td>';
		if($running_day == 6):
			$calendar.= '</tr>';
			if(($day_counter+1) != $days_in_month):
				$calendar.= '<tr class="calendar-row">';
			endif;
			$running_day = -1;
			$days_in_this_week = 0;
		endif;
		$days_in_this_week++; $running_day++; $day_counter++;
	endfor;

	/* finish the rest of the days in the week */
	if($days_in_this_week < 8):
		for($x = 1; $x <= (8 - $days_in_this_week); $x++):
			$calendar.= '<td class="calendar-day-np"> </td>';
		endfor;
	endif;

	/* final row */
	$calendar.= '</tr>';

	/* end the table */
	$calendar.= '</table>';
	
	/* all done, return result */
	return $calendar;
}

echo draw_calendar($month, $year);

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

        <!-- one row of five days -->
        <tr>
            <td>
                <span class="day-number">2</span>
                CHICKEN QUESADILLA<br />
                SWEET POTATO BITES<br />
                BABY CARROTS<br />
                CUCUMBER SLICES<br />
                WG BISCUIT W/BUTTER CUP - ALL<br />
                PINEAPPLE TIDBITS OR APPLE<br />
                another line
            </td>
         <td>
                <span class="day-number">3</span>
                CHICKEN QUESADILLA<br />
                SWEET POTATO BITES<br />
                BABY CARROTS<br />
                CUCUMBER SLICES<br />
                WG BISCUIT W/BUTTER CUP - ALL<br />
                PINEAPPLE TIDBITS OR APPLE
            </td>
         <td>
                <span class="day-number">4</span>
                CHICKEN QUESADILLA<br />
                SWEET POTATO BITES<br />
                BABY CARROTS<br />
                CUCUMBER SLICES<br />
                WG BISCUIT W/BUTTER CUP - ALL<br />
                PINEAPPLE TIDBITS OR APPLE
            </td>
                         <td>
                <span class="day-number">5</span>
                CHICKEN QUESADILLA<br />
                SWEET POTATO BITES<br />
                BABY CARROTS<br />
                CUCUMBER SLICES<br />
                WG BISCUIT W/BUTTER CUP - ALL<br />
                PINEAPPLE TIDBITS OR APPLE
            </td>
             <td>
                <span class="day-number">6</span>
                CHICKEN QUESADILLA<br />
                SWEET POTATO BITES<br />
                BABY CARROTS<br />
                CUCUMBER SLICES<br />
                WG BISCUIT W/BUTTER CUP - ALL<br />
                PINEAPPLE TIDBITS OR APPLE
            </td>
        </tr>

                    <!-- one row of five days -->
        <tr>
            <td>9 - green eggs</td>
            <td>10 - ham</td>
            <td>11 - green egs</td>
            <td>12 - ham</td>
            <td>13 - greeen eggs</td>
        </tr>

                    <!-- one row of five days -->
        <tr>
            <td>16 - green eggs</td>
            <td>17 - ham</td>
            <td>18 - green egs</td>
            <td>19 - ham</td>
            <td>20 - greeen eggs</td>
        </tr>

                    <!-- one row of five days -->
        <tr>
            <td>23 - green eggs</td>
            <td>24 - ham</td>
            <td>25 - green egs</td>
            <td>26 - ham</td>
            <td>27 - greeen eggs</td>
        </tr>

                    <!-- one row of five days -->
        <tr>
            <td>30 - green eggs</td>
            <td>31 - ham</td>
            <td>1 - green egs</td>
            <td>2 - ham</td>
            <td>3 - greeen eggs</td>
        </tr>

        <tr>
            <td>30 - green eggs</td>
            <td>31 - ham</td>
            <td>1 - green egs</td>
            <td>2 - ham</td>
            <td>3 - greeen eggs</td>
        </tr>
    </tbody>
</table>