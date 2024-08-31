<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Credentials: true');
    $user_details =array();
    if(isset($_POST['email'])){ 
        $email=$_POST['email'];
        $conn=new mysqli("127.0.0.1","root","","organicra");
        if($conn->connect_error){
            die("Connection failed for the signup form: " . $conn->connect_error);
            echo json_encode($user_details);
            exit();
        }
        else{
            $sql_query = "SELECT * from user_details WHERE email='$email'";
            $res=$conn->query($sql_query);
            if(!$res){
                return $user_details;
            }
            $fetch_data = mysqli_fetch_assoc($res);
            $user_details['user_name']=$fetch_data['name'];
            $user_details['phone_number']=$fetch_data['phone_number'];
            $user_details['email']=$fetch_data['email'];
            echo json_encode($user_details);
        }
    }
    else{
        echo json_encode($user_details);
    }
?>