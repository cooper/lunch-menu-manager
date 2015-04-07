<?php

require_once('functions/session.php');
include('verify_login.php');

if (!isset($_POST['username']) || !isset($_POST['password']))
    die('Credentials not specified');

if (verify_login($_POST['username'], $_POST['password'])) {
    $_SESSION['logged_in'] = true;
    $_SESSION['theme'] = 'red-and-black';
    header('Location: administrator.php');
}
else header('Location: index.php');

?>