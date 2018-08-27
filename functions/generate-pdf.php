<?php

$LOGIN_REQUIRED = true;
$html2pdf = 'www.html2pdf.it'; // can be overwritten in verify_password.php
require_once('session.php');
require_once('../verify_password.php');

// determine URI for service to access
$url = isset($_SERVER['URL']) ? $_SERVER['URL'] : $_SERVER['DOCUMENT_URI'];
$calendar_php = explode('/', $url);

array_pop($calendar_php); // remove generate-pdf.php
array_pop($calendar_php); // remove functions/
$calendar_php = implode($calendar_php, '/') . '/calendar.php';
$calendar_php = "http://{$_SERVER['SERVER_NAME']}:{$_SERVER['SERVER_PORT']}$calendar_php";

// add GET parameters
$calendar_php .= '?pdf=true';
$calendar_php .= "&year={$_GET['year']}";
$calendar_php .= "&month={$_GET['month']}";
$calendar_php .= "&mode={$_GET['mode']}";

// encode the URL
$calendar_php = urlencode($calendar_php);

// redirect to generator
$generator_url = "http://$html2pdf/?url=$calendar_php&format=Letter&margin=1cm&orientation=landscape&download=true&filename=menu-{$_GET['month']}-{$_GET['year']}.pdf";

echo json_encode(array('generator' => $generator_url));

?>
