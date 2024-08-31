<?php
    header("Access-Control-Allow-Origin:*");
    $conn=new mysqli("127.0.0.1","root","","organicra");
        $email=$user_id='';
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
        $true=true;
        $add_id_sql="SELECT * from address_details where user_id='$user_id' and default_add='$true'";
        $res=$conn->query($add_id_sql);
        if(!$res){
            echo "wrong";
            exit();
        }
        $add_details=mysqli_fetch_assoc($res);
        $add_id=$add_details['id'];
        $order_id="ID";
        for($i=0;$i<6;$i++){
            $str=strval(rand(0,9));
            $order_id=$order_id.$str;
        }
        $ord_date=$_POST['date'];
        $ord_time=$_POST['time'];
            $product_details_sql = mysqli_query($conn,"SELECT P.id as id,P.category as category ,P.name as name,P.image1 as image,P.Qnt as base_qnt,P.price as price,B.Qnt as selected_qnt,P.Qnt_type as Qnt_type from product_details as P inner join (SELECT product_id,Qnt from shopping_bag_item where user_id='$user_id') as B on P.id=B.product_id");
            while($rows=mysqli_fetch_assoc($product_details_sql)){
                $product_id=$rows['id'];
                $product_name=$rows['name'];
                $product_image=$rows['image'];
                $cost=(($rows['selected_qnt']/$rows['base_qnt'])*$rows['price']);
                $ord_status=false;
                $ord_qnt=$rows['selected_qnt'];
                $ord_qnt_type=$rows['Qnt_type'];
                $order_insert_sql="INSERT INTO order_details (user_id,product_id,product_name,product_image,cost,ord_date,ord_time,ord_qnt,ord_qnt_type,ord_unq_id,add_id) VALUES('$user_id','$product_id','$product_name','$product_image','$cost','$ord_date','$ord_time','$ord_qnt','$ord_qnt_type','$order_id','$add_id')";
                $res=$conn->query($order_insert_sql);
        }
        echo true;
    }
    else{
        echo false;
    }
?>