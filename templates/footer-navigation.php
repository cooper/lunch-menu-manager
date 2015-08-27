<?php

require_once(__DIR__.'/../functions/month-nav.php');

?>

<div id="menu-footer-navigation">
    <div class="right">
        <a href="<?= nextMonth('calendar.php') ?>" title="Next month">&rarr;</a>
    </div>
    <div class="left">
        <a href="<?= previousMonth('calendar.php') ?>" title="Previous month">&larr;</a>
    </div>
</div>