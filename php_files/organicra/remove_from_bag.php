<?php
header("Access-Control-Allow-Origin:*");
    $conn=mysqli_connect("127.0.0.1","root","","organicra");
    if(isset($_POST['email'])){
        $email=$_POST['email'];
        $sql = "SELECT *FROM user_details where email='$email'";
        $res=$conn->query($sql);
        $details=mysqli_fetch_assoc($res);
        if($res){
            $user_id=$details['user_id'];
        }
        $product_id=$_POST['product_id'];
        $sql="DELETE from shopping_bag_item where user_id='$user_id' and product_id='$product_id'";
        $res=$conn->query($sql);
        if($res){
            echo true;
        }
        else{
            return false;
        }
    }
?>