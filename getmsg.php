<?php
require_once ('config.php');
$stmt = $pdo->query('SELECT * FROM msgs');
$arraymsgs = array();
while ($row = $stmt->fetch())
{
    $objectmsg             = array(
        "name"          => $row['name'],
        "time"        => $row['time'],
        "msg"    => $row['msg']
    );
    $arraymsgs[] = $objectmsg;
}
echo json_encode($arraymsgs);
$stmt = null;
$pdo = null;

?>