<?php
    header("Access-Control-Allow-Origin:*");
    $conn=new mysqli("127.0.0.1","root","","organicra");
    $email=$user_id=$user_mobile_num=$user_name=$house_no=$street_details=$city_dist=$pincode='';
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
        $user_name=$_POST['name'];
        $user_mobile_num=$_POST['phone_num'];
        $house_no=$_POST['house_no'];
        $street_details=$_POST['street_details'];
        $city_dist=$_POST['city_or_dist'];
        $pincode=$_POST['pincode'];
        $add_default=true;
        $add_sql="INSERT INTO address_details (cust_name,user_id,mobile_number,house_no,street_details,city_or_district,pincode,default_add) VALUES('$user_name','$user_id','$user_mobile_num','$house_no','$street_details','$city_dist','$pincode',' $add_default')";
        $res=$conn->query($add_sql);
        if($res){
            echo true;
        }
        else{
            echo false;
        }
    }
?>