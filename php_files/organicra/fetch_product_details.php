<?php
    header("Access-Control-Allow-Origin:*");
    $conn=mysqli_connect("127.0.0.1","root","","organicra");
    if(!$conn)
    {
        die("connection error".mysqli_connect_error());
    }
    $veg_details=array();
    $milk_product_details=array();
    $fruit_details=array();
    if(isset($_POST['category'])){
        if($_POST['category']=='vegetables'){
            $res=mysqli_query($conn,"SELECT * FROM product_details where category='vegetables' order by name");
            while($rows=mysqli_fetch_assoc($res)){
                $fetch_vegtables= $rows;
                $veg_details[$fetch_vegtables['id']]=$fetch_vegtables;
            }
            echo json_encode($veg_details);
        }
        else if($_POST['category']=='fruits'){
            $res=mysqli_query($conn,"SELECT * FROM product_details where category='fruits'");
            while($rows=mysqli_fetch_assoc($res)){
                $fetch_fruits= $rows;
                $fruit_details[$fetch_fruits['id']]=$fetch_fruits;
            }
            echo json_encode($fruit_details);
        }
        else if($_POST['category']=='milk products'){
            $res=mysqli_query($conn,"SELECT * FROM product_details where category='milk products'");
            while($rows=mysqli_fetch_assoc($res)){
                $fetch_milk_products= $rows;
                $milk_product_details[$fetch_milk_products['id']]=$fetch_milk_products;
            }
            echo json_encode($milk_product_details);
        }
        else if($_POST['category']=='grains'){
            $res=mysqli_query($conn,"SELECT * FROM product_details where category='grains'");
            while($rows=mysqli_fetch_assoc($res)){
                $fetch_grains= $rows;
                $grain_details[$fetch_grains['id']]=$fetch_grains;
            }
            echo json_encode($grain_details);
        }
        else if($_POST['category']=='meat'){
            $res=mysqli_query($conn,"SELECT * FROM product_details where category='Meat'");
            while($rows=mysqli_fetch_assoc($res)){
                $fetch_meat= $rows;
                $meat_details[$fetch_meat['id']]=$fetch_meat;
            }
            echo json_encode($meat_details);
        }
    }
    else{
        echo "Post problem";
    }
?>