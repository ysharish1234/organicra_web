
<?php
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");
    $conn=mysqli_connect("127.0.0.1","root","","organicra");
    $email='';
    $order_details=array();
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
        $fetch_order_details_sql="SELECT *from order_details where user_id='$user_id'";
        $res=mysqli_query($conn,$fetch_order_details_sql);
        while($rows=mysqli_fetch_assoc($res)){
            $order_details[$rows['id']]=$rows;
        }
        echo json_encode($order_details);
    }
?>