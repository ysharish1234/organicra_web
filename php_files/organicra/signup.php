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
    $name=$phNumber=$email=$password="";
    if ($conn->connect_error){
        die("Connection failed for the signup form: " . $conn->connect_error);
        $user_points["db_connection"]="Database is not connected";
        exit();
    }
    else{
        $name=$_POST['name'];
        $phNumber=$_POST['phNumber'];
        $email=$_POST['email'];
        $password=$_POST['password'];
    }
    $user_points['dup_email']=False;
    $email_chek="SELECT *FROM user_details where email='$email';";
    $email_check_res=$conn->query($email_chek);
    if(mysqli_num_rows($email_check_res)>0){
        $user_points['dup_email']=True;
        echo json_encode($user_points);
        $conn->close();
        exit();
    }
    $user_points['dup_email']=False;
    try{
        // $mail->SMTPDebug = 2;
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
        $sql="INSERT INTO user_details (name,phone_number,email,password,verification_code,email_verification_status) VALUES('$name','$phNumber','$email','$password','$verification_code','False');";
        $res=$conn->query($sql);
        if(!$res){
            $user_points['query_excecution']=True;
        }
        $mail->isSMTP();
        $mail->SMTPAutoTLS = false;  
        $mail->Subject="Email Verification";
        $mail->Body='<p>Your Verification code is:<b style="font-size:30px;">'.
        $verification_code.'</b> Welcome to the family of Organicra</p> <img src="https://r2.easyimg.io/t9nmsola8/logo.jpg" alt="Organicra logo" style="width:200px;height:200px;"/>';
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
?>