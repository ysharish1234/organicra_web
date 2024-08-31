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
        if(isset($_POST['add'])){
            $base_qnt=$_POST['base_qnt'];
            $product_id=$_POST['product_id'];
            $previous_qnt=$_POST['previous_qnt'];
            $new_qnt=$previous_qnt+$base_qnt;
            $sql="UPDATE shopping_bag_item SET Qnt='$new_qnt' where user_id='$user_id' and product_id='$product_id';";
            $res=$conn->query($sql);
            if($res){
                echo true;
            }
            else{
                echo $res;
            }
        }
        else if(isset($_POST['sub'])){
            $base_qnt=$_POST['base_qnt'];
            $product_id=$_POST['product_id'];
            $previous_qnt=$_POST['previous_qnt'];
            $new_qnt=$previous_qnt-$base_qnt;
            $sql="UPDATE shopping_bag_item SET Qnt='$new_qnt' where user_id='$user_id' and product_id='$product_id';";
            $res=$conn->query($sql);
            if($res){
                echo true;
            }
            else{
                echo $res;
            }
        }
    }
?>