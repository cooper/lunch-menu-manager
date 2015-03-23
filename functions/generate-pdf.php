<?php

require_once('session.php');
use mikehaertl\wkhtmlto\Pdf;

$pdf = new Pdf('http://localhost:'.$_SERVER['SERVER_PORT']."/calendar.php?year={$_GET['year']}&month={$_GET['month']}");
$pdf->saveAs('menu.pdf');

echo json_encode(array(
    'file' => 'menu.pdf'
));

?>