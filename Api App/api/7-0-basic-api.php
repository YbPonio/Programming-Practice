<?php

if (!isset($_SERVER['PHP_AUTH_USER'])) {
    header("WWW-Authenticate: Basic realm=\"Private Area\"");
    header('HTTP/1.0 401 Unauthorized');
    print "Sorry - you need valid credentials to be granted access!";
    exit;
} else {
    if (($_SERVER["PHP_AUTH_USER"]) == 'admin' && ($_SERVER["PHP_AUTH_PW"]) == 'admin123') {
        print "Welcome to the private area!";
    } else {
        header("WWW-Authenticate: Basic realm=\"Private Area\"");
        header('HTTP/1.0 401 Unauthorized');
        print "Sorry - you need valid credentials to be granted access!";
    }
}
