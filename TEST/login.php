<?php
// Handle the form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Check credentials (example: hard-coded credentials)
    if ($username === "user" && $password === "password") {
        // Authentication successful
        setcookie("user", $username, time() + 3600, "/");
        header("Location: welcome.php");
    } else {
        echo "Invalid username or password";
    }
}
?>
