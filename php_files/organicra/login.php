<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Credentials: true');
    $conn=new mysqli("127.0.0.1","root","","organicra");
    $email=$password="";
    $user_points=array();
    $user_points['email_verified']=false;
    $user_points['password_verified']=false;
    if(isset($_POST['email'])){
        $email=$_POST['email'];
    }
    if(isset($_POST['password'])){
        $password=$_POST['password'];
    }
    $sql_query="SELECT * FROM user_details where email='$email';";
    $res=$conn->query($sql_query);
    if(!$res){
        exit();
    }
    else{
        if(mysqli_num_rows($res)>0){
            $user_points['email_verified']=true;
            $fetch_data=mysqli_fetch_assoc($res);
            $fecth_email=$fetch_data['email'];
            $fetch_password=$fetch_data['password'];
            if($password==$fetch_password){
                $user_points['password_verified']=true;
            }
            echo json_encode($user_points);
        }
        else{
            echo json_encode($user_points);
        }
    }
?>