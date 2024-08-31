<?php
     header("Access-Control-Allow-Origin:*");
     session_start();
     $user_inputs=array();
     $user_inputs['verified']=false;
     if($_SERVER["REQUEST_METHOD"] =="POST"){
        $conn=new mysqli("127.0.0.1","root","","organicra");
        $email=$otp="";
        if($conn->connect_error){
            die("Connection failed for the signup form: " . $conn->connect_error);
            echo json_encode($user_inputs);
            exit();
        }
        else
        {
            $email=$_POST['email'];
            $otp=$_POST['otp'];
            $sql_query="SELECT * FROM user_details where email='$email';";
            $res=$conn->query($sql_query);
            if(!$res){
                exit();
            }
            else
            {
                if(mysqli_num_rows($res)>0){
                    $fetch_data=mysqli_fetch_assoc($res);
                    $fetch_code=$fetch_data['verification_code'];
                    $code="0";
                    $status=True;
                    if($fetch_code==$otp){
                        $user_inputs['verified']=True;
                        $update_query = "UPDATE user_details SET verification_code='$code', email_verification_status='$status' WHERE email='$email'";
                        $res = $conn->query($update_query);
                        if ($res) {
                            echo json_encode($user_inputs);
                        } else {
                            echo "Error: " . $conn->error;
                        }
                    }
                    else
                    {
                        echo json_encode($user_inputs);
                    }
                }
            }
        }
     }
?>