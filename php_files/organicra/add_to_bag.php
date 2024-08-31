<?php
    header("Access-Control-Allow-Origin:*");
    $conn=mysqli_connect("127.0.0.1","root","","organicra");
    if(isset($_POST['email'])){
        $email=$_POST['email'];
        $product_id=$_POST['product_id'];
        $quantity=$_POST['qnt'];
        $sql="SELECT * from user_details where email='$email'";
        $res=$conn->query($sql);
        if($res){
            $details=mysqli_fetch_assoc($res);
            $user_id=$details['user_id'];
        }
        $check_sql="SELECT * FROM shopping_bag_item where product_id='$product_id'";
        $res=$conn->query($check_sql);
        if(mysqli_num_rows($res)>0){
            echo false;
            exit();
        }
        $shop__bag_item_sql="INSERT INTO shopping_bag_item (product_id,user_id,Qnt) values('$product_id','$user_id','$quantity')";
        $res=$conn->query($shop__bag_item_sql);
        if($res){
            echo true;
        }
        else{
            echo false;
        }
    }
?>