<?php

function previousMonth() {
    global $year, $month;
    $newYear  = $year;
    $newMonth = $month;
    if ($month == 1) {
        $newYear--;
        $newMonth = 12;
    }
    else
        $newMonth--;
    return "administrator.php?year=$newYear&month=$newMonth";
}

function nextMonth() {
    global $year, $month;
    $newYear  = $year;
    $newMonth = $month;
    if ($month == 12) {
        $newYear++;
        $newMonth = 1;
    }
    else
        $newMonth++;
    return "administrator.php?year=$newYear&month=$newMonth";
}

?>

<div class="administrator-tools-container">
    <div style="width: 1000px; margin: auto;">
        <ul class="administrator-tools">
            <li><a href="<?php echo previousMonth(); ?>" title="Previous month">&larr;</a></li>
            <li><a href="<?php echo nextMonth(); ?>" title="Next month">&rarr;</a></li>
            <li><a id="mode-trigger" href="#" title="Toggle between breakfast and lunch" style="width: 70px;">Breakfast</a></li>
            <li><a id="print-button" href="#" title="Print this month's menu">Print</a></li>
            <li><a id="email-button" href="#" title="Send this month's menu via email">E-mail</a></li>
            <li><a href="#" title="Log out of administrator panel">Log out</a></li>
        </ul>
    </div>
</div>

<div id="admin-overlay">
    <div id="admin-window">
        <h2 id="admin-window-title">
            <span>Print menu</span>
            <a id="admin-window-done" href="#">Done</a>
        </h2>
        <div id="admin-window-padding">
            <br /><br />
            <img src="images/loading.gif" alt="Loading" /><br />
            Please wait as the printable menu is generated...
        </div>
    </div>
</div>