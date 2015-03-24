<?php
    session_start();
    if (isset($LOGIN_REQUIRED) && !isset($_SESSION['logged_in']))
        die('Not authorized');
?>