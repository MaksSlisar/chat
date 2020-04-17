<?php
require_once ('config.php');
$msg=$_POST['message'];
$name=$_POST['name'];
$time=$_POST['time'];
$stmt = $pdo->prepare("INSERT INTO msgs (name, msg, time) VALUES (:name, :value,:time)");
$stmt->bindParam(':name', $name);
$stmt->bindParam(':value', $msg);
$stmt->bindParam(':time', $time);



$stmt->execute();
$stmt = null;
$pdo = null;
echo 'sended';
?>