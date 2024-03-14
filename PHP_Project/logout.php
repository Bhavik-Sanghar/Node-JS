<?php
// Log out by deleting the user's cookie
setcookie("user", "", time() - 3600, "/");
header("Location: login.html");
?>
