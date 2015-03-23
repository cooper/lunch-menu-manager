<?php
    require_once('session.php');
    sleep(5);
    echo json_encode(array(
        'file' => 'menu.pdf'
    ));
?>