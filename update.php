<?php
require_once('config.php');
$message = $_POST['message'];
$name = $_POST['name'];
$newname= $_POST['newname'];
$newmsg= $_POST['newmsg'];
$stmt = $pdo->prepare("UPDATE msgs SET name=:newname, msg=:newmsg where name=:msgname and msg=:msgmsg");
$stmt->bindParam(':msgname', $name);
$stmt->bindParam(':msgmsg', $message);
$stmt->bindParam(':newname', $newname);
$stmt->bindParam(':newmsg', $newmsg);
$stmt->execute();
$stmt = null;
$pdo = null;
?>
