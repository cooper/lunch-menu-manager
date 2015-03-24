<?php

require_once('functions/session.php');
include('verify_login.php');

if (verify_login($_POST['username'], $_POST['password'])) {
    $_SESSION['logged_in'] = true;
    header('Location: administrator.php');
}
else header('Location: index.php');

?>