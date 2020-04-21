
<?php
$host = "eu-mm-auto-dub-03-b.cleardb.net";
$db = "heroku_8f723ab4158d2db";
$charset = "UTF8";
$user = "b538e43d6bc357";
$pass ="85a26568";
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$opt = array(
PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
);
$pdo = new PDO($dsn, $user, $pass, $opt);
?>