<?php
    header("Access-Control-Allow-Origin:*");
    $conn=mysqli_connect("127.0.0.1","root","","organicra");
    $product_details=array();
    if(isset($_POST['email'])){
        $email=$_POST['email'];
        $sql = "SELECT *FROM user_details where email='$email'";
        $res=$conn->query($sql);
        $details=mysqli_fetch_assoc($res);
        if($res){
            $user_id=$details['user_id'];
        }
        $fetch_product_details_sql = mysqli_query($conn,"SELECT P.id as id,P.category as category ,P.name as name,P.image1 as image,P.Qnt as base_qnt,P.price as price,B.Qnt as selected_qnt,P.Qnt_type as Qnt_type from product_details as P inner join (SELECT product_id,Qnt from shopping_bag_item where user_id='$user_id') as B on P.id=B.product_id");
        while($rows=mysqli_fetch_assoc($fetch_product_details_sql)){
            $fetch_product_details= $rows;
            $product_details[$fetch_product_details['id']]=$fetch_product_details;
        }
        echo json_encode($product_details);
    }
?>