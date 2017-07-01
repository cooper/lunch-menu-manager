<?php
    $LOGIN_REQUIRED = true;
    require_once('functions/session.php');
    require_once('functions/date-input.php');
    $theme = isset($_SESSION['theme']) ? $_SESSION['theme'] : 'crimson';
?>
<!doctype html>
<html>
<head>
    <meta charset="utf-8" />
    <title>LMM - <?= "$monthName $year" ?></title>
    <link href="styles/calendar.css" type="text/css" rel="stylesheet" />
    <link href="styles/administrator-tools.css" type="text/css" rel="stylesheet" />
    <link href="styles/window.css" type="text/css" rel="stylesheet" />
    <link href="styles/<?= $theme ?>/calendar.css" type="text/css" rel="stylesheet" />
    <link href="styles/<?= $theme ?>/window.css" type="text/css" rel="stylesheet" />
    <link href="styles/<?= $theme ?>/administrator-tools.css" type="text/css" rel="stylesheet" />
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,600" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" />
    <link rel="icon" type="image/png" href="images/favicon.png" />
    <script type="text/javascript" src="scripts/vendored/mootools.min.js"></script>
    <script type="text/javascript" src="scripts/calendar.js"></script>
    <script type="text/javascript" src="scripts/menu-editor.js"></script>
    <script type="text/javascript" src="scripts/administrator-tools.js"></script>
</head>
<body>
    <?php
        $administrator = true;
        require_once('templates/calendar.php');
        require_once('templates/administrator-tools.php');
    ?>
</body>
</html>
