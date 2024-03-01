<?php
session_start();

// Check if the user is logged in
if (!isset($_COOKIE["user"])) {
    header("Location: login.html");
    exit();
}

$username = $_COOKIE["user"];

// Display the user's username
echo "Welcome, " . $username;
?>
