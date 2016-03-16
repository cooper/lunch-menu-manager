<?php

require_once(__DIR__.'/../functions/date-input.php');

$mainCellBody = '';
$fillerCellBody = '';

$administrator = isset($administrator);
if ($administrator) {
    $mainCellBody   = '<div class="calendar-cell-edit"><i class="fa fa-pencil"></i> Edit menu</div>';
    $fillerCellBody = '<div class="calendar-cell-edit"><i class="fa fa-pencil"></i> Edit notes</div>';
}

function draw_calendar ($month, $year) {
    global $month, $year, $mainCellBody, $fillerCellBody;

	$running_day       = date('w', mktime(0, 0, 0, $month, 1, $year));     // day of the week (0-6)
	$days_in_month     = date('t', mktime(0, 0, 0, $month, 1, $year));     // # of days in month
    $weeks_in_month    = 0;                                                // # of week row thus far (->5)
    $cell_id           = 1;                                                // <td> cell ID (1-25)
    $calendar          = '';                                               // HTML calendar output

    /*####################
    ### THE FIRST WEEK ###
    #####################*/

    // if the month starts on a Saturday,
    // just skip the entire first week
    $skip_first_week = false;
    if ($running_day == 6)
        $skip_first_week = true;

    // otherwise, start the first week
    else
        $calendar .= '<tr>';

    // if the month does not start on a Saturday (!$skip_first_week),
    // add and possible blank days at the beginning of the calendar.
    // these are days from the previous month.
    if (!$skip_first_week)
        for ($x = 0; $x < $running_day; $x++) {

            // if it's not Sunday or Saturday, add the cell.
            if ($x != 0 && $x != 6)
                $calendar.= '<td data-cell="'. $cell_id++ .'"><div class="inner">' .
                '<div class="notes-items"></div>' . $fillerCellBody . '</div></td>';

        }

    /*############################
    ### CELLS FOR MON THRU FRI ###
    ############################*/

    // start at the first, and move through the whole month.
    $month_over = false;
	for ($list_day = 1; $list_day <= $days_in_month; $list_day++) {

        // if it is Monday through Friday, add a cell.
        if ($running_day != 0 && $running_day != 6) {

            // is this the current day?
            $is_today = "$year-$month-$list_day" == date('Y-n-j');
            $today_html = $is_today ? ' today' : '';

            // add the cell for the day.
            $calendar.= '<td data-cell="'        . $cell_id++   .
                          '" data-year="'        . $year        .
                          '" data-month="'       . $month       .
                          '" data-day="'         . $list_day    .
                          '" data-running-day="' . $running_day .
                          '" class="edit-button' . $today_html  . '">';
            $calendar .= '<div class="inner">';
            $calendar .=      '<span class="day-number">' . $list_day . '</span>';
            $calendar .=      '<span class="menu-items"></span>' . $mainCellBody;
            $calendar .= '</div></td>';

        }

        // this is Saturday, the end of the week.
		if ($running_day == 6) {

            // if we're skipping the first week,
            // do so, and unset the skipper
            if ($skip_first_week) {
                $skip_first_week = false;
            }

            // otherwise, close the week row
            // and increase the week count
            else {
                $calendar.= '</tr>';
                $weeks_in_month++;
            }

            // this is the last day of the month
            if ($list_day >= $days_in_month)
                $month_over = true; // force end of month

            // this is not the last day of the month.
            // start a new week row if there are at least two more days
            // in the month (Sunday, Monday)
            elseif ($days_in_month - $list_day >= 2)
                $calendar .= '<tr>';

            // start the week over
			$running_day = -1;

        }

        $running_day++;

        // this is the end of the month.
        if ($month_over)
            break;

    }

    /*#############################
    ### FINISHING OFF THE MONTH ###
    #############################*/

    // for whatever is left of the five weeks...
    while ($weeks_in_month < 5) {

        // for the current day of the week until Saturday...
        while ($running_day < 6) {

            // add empty cells for any M-F.
            if ($running_day != 0 && $running_day != 6)
                $calendar .= '<td data-cell="'. $cell_id++ .'"><div class="inner">' .
                '<div class="notes-items"></div>' . $fillerCellBody . '</div></td>';

            $running_day++;
        }

        // finish the week
        $calendar.= '</tr>';
        $weeks_in_month++;

    }

    return $calendar;
}

// calendar menu mode. defaults to lunch.
$mode = isset($_GET['mode']) && $_GET['mode'] == 'breakfast' ?
    'breakfast' : 'lunch';

// special styling when month view is opened from week view.
$consistent = $administrator || (isset($_GET['ref']) && $_GET['ref'] == 'week');

?>

<table class="lunch-calendar mode-<?php echo $mode; if ($administrator) echo ' administrator'; ?>" data-year="<?= $year ?>" data-month="<?= $month ?>">
    <caption>

        <div id="caption-mode-container">
            <?php if ($administrator): ?>
            <div id="caption-mode-toggle"><i class="fa fa-leaf"></i> Toggle menu mode</div>
            <?php endif; ?>
            <span class="right" id="caption-mode"><?= ucfirst($mode) ?> menu</span>
        </div>

        <div id="caption-left-container">
            <?php if ($administrator): ?>
            <div id="caption-name-edit"><i class="fa fa-pencil"></i> Edit institution</div>
            <?php endif; ?>
            <span class="left" id="caption-left"></span>
        </div>

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
    if (!$administrator && !isset($pdf))
        require(__DIR__.'/footer-navigation.php');
?>
<div id="menu-notes">
    <?php if ($administrator): ?>
    <div id="menu-notes-edit"><i class="fa fa-pencil"></i> Edit footer</div>
    <?php endif; ?>
    <span id="menu-notes-notes"><?php if ($administrator) echo "(no footer text)"; ?></span>
</div>
