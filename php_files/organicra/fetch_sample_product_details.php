<?php
     header("Access-Control-Allow-Origin:*");
     $conn=mysqli_connect("127.0.0.1","root","","organicra");
     if(!$conn)
     {
         die("connection error".mysqli_connect_error());
     }
        $product_details=array();
        $res=mysqli_query($conn,"SELECT * FROM product_details order by name");
        while($rows=mysqli_fetch_assoc($res)){
            $fetch_products= $rows;
            $product_details[$fetch_products['id']]=$fetch_products;
        }
        echo json_encode($product_details);
?>