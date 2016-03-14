<?php

require_once(__DIR__.'/../functions/month-nav.php');

$prev    = previousMonthNum();
$prevURL = previousMonth('administrator.php');
$prevNum = $prev[0];

$next    = nextMonthNum();
$nextURL = nextMonth('administrator.php');
$nextNum = $next[0];

?>

<!-- TOP BAR -->

<div class="administrator-tools-container">
    <div class="administrator-tools-thousand">
        <ul class="administrator-tools right">
            <!--
            <li><a id="mode-trigger" href="#" title="Toggle between breakfast and lunch" style="width: 70px;">Breakfast</a></li>
            <li><a id="notes-button" href="#" title="Change the notes on the bottom of this calendar">Notes</a></li>
            -->
            <li><a href="logout.php" title="Log out of administrator panel"><i class="fa fa-sign-out"></i> Log out</a></li>
            <li><a id="email-button" href="#" title="Share this month's menu, such as via email"><i class="fa fa-share-alt"></i> Share</a></li>
            <li><a id="print-button" href="#" title="Print this month's menu"><i class="fa fa-print"></i> Print</a></li>
        </ul>
        <ul class="administrator-tools left">
            <li id="status-li" class="logo"><a id="status-indicator">
                <i id="status-icon" class="fa fa-check-circle"></i>
                <img id="administrator-logo" class="administrator-logo" src="images/lmm-top.png" alt="lmm" />
                <span id="status-text"></span>
            </a></li>
            <li><a title="View your reminders"><i class="fa fa-list"></i> Reminders</a></li>
        </ul>
        <ul class="administrator-tools center">
            <li><a href="<?= $prevURL ?>" title="Previous month">
                <i class="fa fa-chevron-left" style="float: left;"></i>
                <?= DateTime::createFromFormat('!m', $prevNum)->format('F') ?>
            </a></li><li><a href="<?= $nextURL ?>" title="Next month">
                <i class="fa fa-chevron-right right" style="float: right"></i>
                <?= DateTime::createFromFormat('!m', $nextNum)->format('F') ?></a></li>
        </ul>
        <div style="clear: both;"></div>
    </div>
</div>

<!-- OVERLAY WINDOWS -->

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
            <span>Calendar notes</span>
            <a class="admin-window-done" id="notes-window-done" href="#">Done</a>
        </h2>
        <div class="admin-window-padding" id="notes-window-padding">
            <h3>Footer notes</h3>
            <span>
                The notes in the below box will be displayed at the
                bottom of the menu for the currently displayed month.
                Please be aware that four or more lines may prevent
                the printable calendar from fitting on a single page.
            </span>
            <textarea id="notes-window-textarea"></textarea>
            <h3>Calendar name</h3>
            <span>
                The phrase in the below box will be displayed in the
                top left corner of <i>every</i> month; i.e. it will
                propagate to all months. Useful for institution name.
            </span>
            <input type="text" id="notes-window-input" />
        </div>
    </div>
</div>
