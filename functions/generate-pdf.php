<?php

require_once('session.php');

// determine URI for service to access
$calendar_php = explode($_SERVER['DOCUMENT_URI'], '/');
array_pop($calendar_php); // remove generate-pdf.php
array_pop($calendar_php); // remove functions/
$calendar_php = implode($calendar_php, '/') . '/calendar.php';
$calendar_php = "http://{$_SERVER['SERVER_HOST']}:{$_SERVER['SERVER_PORT']}$calendar_php?year={$_GET['year']}&month={$_GET['month']}";

// redirect to generator
$generator_url = "http://www.html2pdf.it/?url=$calendar_php&format=Letter&margin=0cm&orientation=landscape&download=true&filename=menu-{$_GET['month']}-{$_GET['year']}.pdf";

echo json_encode(array('generator' => $generator_url));

?>