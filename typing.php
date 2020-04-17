<?php
require_once ('config.php');
$name = $_POST['name'];
$type = $_POST['type'];

$stmt = $pdo->prepare("UPDATE typing SET action=:istyping where name=:name");
$stmt->bindParam(':name', $name);
$stmt->bindParam(':istyping', $type);
$stmt->execute();

$stmt = $pdo->query("SELECT name FROM typing where action=true ");

$arraymsgs = array();
while ($row = $stmt->fetch())
{
    $arraymsgs[] =  $row['name'];
}
echo json_encode($arraymsgs);
$stmt = null;
$pdo = null;
?>