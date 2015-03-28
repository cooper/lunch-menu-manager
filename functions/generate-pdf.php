<?php

$LOGIN_REQUIRED = true;
require_once('session.php');

// determine URI for service to access
$calendar_php = explode($_SERVER['DOCUMENT_URI'], '/');
array_pop($calendar_php); // remove generate-pdf.php
array_pop($calendar_php); // remove functions/
$calendar_php = implode($calendar_php, '/') . '/calendar.php';
$calendar_php = "http://{$_SERVER['SERVER_NAME']}:{$_SERVER['SERVER_PORT']}$calendar_php";

// add GET parameters
$calendar_php .= "?year={$_GET['year']}";
$calendar_php .= "&month={$_GET['month']}";
$calendar_php .= "&mode={$_GET['mode']}";

// encode the URL
$calendar_php = urlencode($calendar_php);

// redirect to generator
$generator_url = "http://www.html2pdf.it/?url=$calendar_php&format=Letter&margin=1cm&orientation=landscape&download=true&filename=menu-{$_GET['month']}-{$_GET['year']}.pdf";

echo json_encode(array('generator' => $generator_url));

?>