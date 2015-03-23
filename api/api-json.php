<?php

header('Content-Type: application/json');

if (isset($_GET['callback']))
    echo $_GET['callback'].'(';

if (isset($json_result))
    echo $json_result;

if (isset($_GET['callback']))
    echo ')';
?>