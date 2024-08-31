<?php
header("Access-Control-Allow-Origin: *");
$conn = mysqli_connect("127.0.0.1", "root", "", "organicra");
$email = $user_id='';
$add_details = array();
if (isset($_POST['email'])) {
    $email=$_POST['email'];
        $user_sql="SELECT user_id from user_details WHERE email='$email'";
        $res=$conn->query($user_sql);
        if($res){
            $user_details=mysqli_fetch_assoc($res);
            $user_id=$user_details['user_id'];
        }
        else{
            echo false;
            exit();
        }
    $add_sql = "SELECT * FROM address_details WHERE user_id='$user_id'";
    $res = mysqli_query($conn, $add_sql);
    while($rows = mysqli_fetch_assoc($res)){
        $add_details[$rows['id']] = $rows;
    }
    echo json_encode($add_details);
} else {
    echo false;
}
?>
