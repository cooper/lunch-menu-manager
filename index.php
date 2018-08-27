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
    <title>LMM</title>
    <link rel="icon" type="image/png" href="images/favicon.png" />
    <style type="text/css">
        body {
            background-color: rgb(240, 250, 255);
            font-family: sans-serif;
        }
        #logo {
            width: 400px;
            border: none;
        }
        td {
            text-align: left;
        }
        input[type=text], input[type=password] {
            width: 150px;
            padding: 3px;
            margin-left: 20px;
            border: 1px solid rgb(190, 210, 220);
        }
        input[type=submit] {
            width: 50px;
            margin-top: 10px;
            height: 25px;
            background-color: #fff;
            border: 1px solid rgb(190, 210, 220);
        }
        input[type=submit]:hover, input[type=submit]:active {
            background-color: rgb(240, 250, 255);
            color: inherit;
        }
        form {
            margin-top: 20px;
        }
        #box {
            width: 500px;
            padding: 30px;
            border: 1px solid rgb(190, 210, 220);
            background-color: white;
            margin: 50px auto 20px auto;
        }
        #footer {
            margin: auto;
            color: rgb(121, 155, 172);
            text-align: center;
            font-size: 90%;
            line-height: 1.4em;
        }
    </style>
</head>
<body>
    <div id="box">
        <div style="text-align: center">
            <img src="images/lmm.png" alt="lmm" id="logo" />
        </div>
        <form action="login.php" method="post">
            <table>
                <tr>
                    <td>Username</td>
                    <td><input type="text" name="username" /></td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td><input type="password" name="password" /></td>
                </tr>
                <tr>
                    <td><input type="submit" name="submit" value="Login" /></td>
                </tr>
            </table>
        </form>
    </div>
    <div id="footer">
        System Revision 7 &ndash;
        Last Updated August 27, 2018
    </div>
</body>
</html>
