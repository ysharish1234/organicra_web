<?php
    header("Access-Control-Allow-Origin:*");
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;
    require 'PHPMailer\src\Exception.php';
    require 'PHPMailer\src\PHPMailer.php';
    require 'PHPMailer\src\SMTP.php';
    $conn=new mysqli("127.0.0.1","root","","organicra");
    $user_points=array();
    $mail=new PHPMailer(true);
    $email="";
    if ($conn->connect_error){
        die("Connection failed for the signup form: " . $conn->connect_error);
        $user_points["db_connection"]="Database is not connected";
        exit();
    }
    else{
        $email=$_POST['email'];
    }
    $user_points['email']=False;
    $email_chek="SELECT *FROM user_details where email='$email';";
    $email_check_res=$conn->query($email_chek);
    if(mysqli_num_rows($email_check_res)==0){
        $user_points['email']=false;
        echo json_encode($user_points);
        $conn->close();
        exit();
    }
    else{
        try{
            $mail->isSMTP();
            $mail->Host="smtp.gmail.com";
            $mail->SMTPAuth=true;
            $mail->Username="reddaiahnallannagari@gmail.com";
            $mail->Password="qkad brqx typc uvhk";
            $mail->SMTPSecure=PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port=587;
            $mail->setFrom("reddaiahnallannagari@gmail.com","Organicra");
            $mail->addAddress($email);
            $mail->isHTML(true);
            $verification_code="";
            for($i=0;$i<6;$i++){
                $str=strval(rand(0,9));
                $verification_code=$verification_code.$str;
            }
            $update_otp="UPDATE user_details SET verification_code='$verification_code' WHERE email='$email'";
            $res=$conn->query($update_otp);
            if(!$res){
                $user_points['email']=false;
                $conn->close();
                exit();
            }
            $mail->isSMTP();
            $mail->SMTPAutoTLS = false;  
            $mail->Subject="Otp to signup";
            $mail->Body='<p>Your Verification code is:<b style="font-size:30px;">'.
            $verification_code.'<img src="https://r2.easyimg.io/t9nmsola8/logo.jpg" alt="Organicra logo" style="width:200px;height:200px;"/>';
            $mail_sent=False;
            if($mail->send()){
                $user_points['email']=True;
            }
        }
        catch(Exception $e){
            $user_points['email']=False;
        }
        $conn->close();
            echo json_encode($user_points);
        exit();
    }
?>