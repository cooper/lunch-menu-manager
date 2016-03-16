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
            <!--
            <li><a title="View your reminders"><i class="fa fa-list"></i> Reminders</a></li>
            -->
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
