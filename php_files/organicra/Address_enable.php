<?php
    header("Access-Control-Allow-Origin:*");
    $conn=mysqli_connect("127.0.0.1","root","","organicra");
    $add_id='';
    if(isset($_POST['add_id'])){
        $add_id=$_POST['add_id'];
        $true=true;
        $false=false;
        $sql="UPDATE address_details SET default_add='$true' WHERE id='$add_id'";
        $res=$conn->query($sql);
        $sql1="UPDATE address_details SET default_add='$false' WHERE id!='$add_id'";
        $res1=$conn->query($sql1);
        if($res){
            echo true;
        }
        else{
            echo false;
        }
    }
    else{
        echo false;
    }
?>