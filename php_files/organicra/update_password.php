<?php
     header("Access-Control-Allow-Origin:*");
     $user_inputs=array();
     $user_inputs['upd_pass']=false;
     if($_SERVER["REQUEST_METHOD"] =="POST"){
        $conn=new mysqli("127.0.0.1","root","","organicra");
        $email=$password="";
        if($conn->connect_error){
            die("Connection failed for the signup form: " . $conn->connect_error);
            echo json_encode($user_inputs);
            exit();
        }
        else
        {
            $email=$_POST['email'];
            $password=$_POST['password'];
            $sql_query="UPDATE user_details SET password='$password' where email='$email';";
            $res=$conn->query($sql_query);
            if(!$res){
                echo json_encode($user_inputs);
                exit();
            }
            else
            {
                $user_inputs['upd_pass']=true;
                echo json_encode($user_inputs);
            }
        }
     }
?>