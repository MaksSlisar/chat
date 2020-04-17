<?php
require_once ('config.php');
$message = $_POST['message'];
$name = $_POST['name'];
$time = $_POST['time'];

$stmt = $pdo->prepare("DELETE FROM msgs WHERE name=:name and msg=:value and time=:time");
$stmt->bindParam(':name', $name);
$stmt->bindParam(':value', $message);
$stmt->bindParam(':time', $time);

$stmt->execute();

echo $message.$name.$time;
$stmt = null;
$pdo = null;
?>