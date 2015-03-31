<?php

// this file encodes an API result data structure in JSON.
// the callback parameter is for JSONP support.
// $json_silent can be used to prevent it from sending any data.

if (!isset($json_silent)) {
    header('Content-Type: application/json');
    
    if (isset($_GET['callback']))
        echo $_GET['callback'].'(';

    if (isset($json_result))
        echo json_encode($json_result);

    if (isset($_GET['callback']))
        echo ');';
    
}

?>