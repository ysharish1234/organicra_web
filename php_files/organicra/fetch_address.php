<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
$conn = mysqli_connect("127.0.0.1", "root", "", "organicra");
$add_id = '';
$add_details = array();
if (isset($_POST['add_id'])) {
    $add_id = $_POST['add_id'];
    $true = true;
    $add_sql = "SELECT * FROM address_details WHERE id='$add_id'";
    $res = mysqli_query($conn, $add_sql);
    $rows = mysqli_fetch_assoc($res);
    $add_details[$add_id] = $rows;
    echo json_encode($add_details);
} else {
    echo false;
}
?>
