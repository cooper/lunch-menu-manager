<?php

require_once('session.php');
require_once('vendor/autoload.php');
use mikehaertl\wkhtmlto\Pdf;

// determine URI to calendar.php
$calendar_php = explode($_SERVER['DOCUMENT_URI'], '/');
array_pop($calendar_php); // remove generate-pdf.php
array_pop($calendar_php); // remove functions/
$calendar_php = implode($calendar_php, '/') . '/calendar.php';

$pdf = new Pdf("http://localhost:{$_SERVER['SERVER_PORT']}$calendar_php?year={$_GET['year']}&month={$_GET['month']}");
print_r($pdf);
$pdf->saveAs('../cache/menu.pdf');
$pdf->send('menu.pdf');

?>