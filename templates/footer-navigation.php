<?php

require_once(__DIR__.'/../functions/month-nav.php');

$prev    = previousMonthNum();
$prevURL = previousMonth('calendar.php');
$prevNum = $prev[0];

$next    = nextMonthNum();
$nextURL = nextMonth('calendar.php');
$nextNum = $next[0];
    
?>

<div id="menu-footer-navigation">
    <div class="right">
        <a href="<?= $nextURL ?>" title="Next month">
            <?= DateTime::createFromFormat('!m', $nextNum)->format('F') ?>
            &rarr;
        </a>
    </div>
    <div class="left">
        <a href="<?= $prevURL ?>" title="Previous month">
            &larr;
            <?= DateTime::createFromFormat('!m', $prevtNum)->format('F') ?>
        </a>
    </div>
</div>