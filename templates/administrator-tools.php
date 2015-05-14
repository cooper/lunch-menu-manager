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
            <li><a id="notes-button" href="#" title="Change the notes on the bottom of this calendar">Notes</a></li>
            <li><a id="print-button" href="#" title="Print this month's menu">Print</a></li>
            <li><a id="email-button" href="#" title="Share this month's menu, such as via email">Share</a></li>
            <li><a href="logout.php" title="Log out of administrator panel">Log out</a></li>
        </ul>
    </div>
</div>

<div class="admin-overlay" id="share-overlay">
    <div class="admin-window" id="share-window">
        <h2 class="admin-window-title" id="share-window-title">
            <span>Printing and sharing</span>
            <a class="admin-window-done" id="share-window-done" href="#">Done</a>
        </h2>
        <div class="admin-window-padding" id="share-window-padding">
            <br /><br />
            <img src="images/loading.gif" alt="Loading" /><br />
            Please wait while the printable menu is generated...
        </div>
    </div>
</div>

<div class="admin-overlay" id="notes-overlay">
    <div class="admin-window" id="notes-window">
        <h2 class="admin-window-title" id="notes-window-title">
            <span>Printing and sharing</span>
            <a class="admin-window-done" id="notes-window-done" href="#">Save</a>
        </h2>
        <div class="admin-window-padding" id="notes-window-padding">
            <br /><br />
            <img src="images/loading.gif" alt="Loading" /><br />
            Please wait while the printable menu is generated...
        </div>
    </div>
</div>