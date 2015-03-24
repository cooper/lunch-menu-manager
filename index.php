<?php
    require_once('functions/session.php');
    if (isset($_SESSION['logged_in'])) {
        header('Location: administrator.php');
        die();
    }
?>
<!doctype html>
<html>
<head>
    <meta charset="utf-8" />
    <title>lmm</title>
    <link rel="icon" type="image/png" href="images/favicon.png" />
    <style type="text/css">
        body {
            background-color: rgb(240, 250, 255);
            font-family: sans-serif;
        }
        #logo {
            width: 100%;
            border: none;
        }
        #a {
            margin: 50px auto;
            display: block;
            width: 500px;
        }
        form {
            display: block;
            width: 500px;
            margin: auto;
        }
        input[type=text] {
            width: 200px;
        }
    </style>
</head>
<body>
    <a id="a" href="https://github.com/cooper/lunch-menu-manager">
        <img src="images/lmm.png" alt="lmm" id="logo" />
    </a>
    <form action="login.php" method="post">
        <table>
            <tr>
                <td>Username</td>
                <td><input type="text" name="username" /></td>
            </tr>
            <tr>
                <td>Password</td>
                <td><input type="text" name="password" /></td>
            </tr>
            <tr>
                <td><input type="submit" name="submit" value="Login" /></td>
            </tr>
        </table>
    </form>
</body>
</html>