<?php
   header("Access-Control-Allow-Origin:*");
   header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");
   $conn=mysqli_connect("127.0.0.1","root","","organicra");
   $email=$user_id='';
   $orderId_details=array();
   if(isset($_POST['email'])){
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
        $ord_add_id_sql="SELECT DISTINCT ord_unq_id, add_id from order_details where user_id='$user_id'";
        $ord_add_id_details=mysqli_query($conn,$ord_add_id_sql);
        while($rows=mysqli_fetch_assoc($ord_add_id_details)){
            $orderId_details[$rows['ord_unq_id']]=$rows['add_id'];
        }
        echo json_encode($orderId_details);
    }
?>