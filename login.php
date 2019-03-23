<?php

require_once('functions/session.php');
require_once('verify_login.php');

if (!isset($_POST['username']) || !isset($_POST['password']))
    die('Credentials not specified');

if (verify_login($_POST['username'], $_POST['password'])) {
    if (isset($demo_mode))
        $_SESSION['demo'] = true;
    $_SESSION['logged_in'] = true;
    $_SESSION['theme'] = 'crimson';
    header('Location: administrator.php');
}
else header('Location: index.php');

?>
