<?php
$conn=mysqli_connect("127.0.0.1","root","","organicra");
if(!$conn)
{
    die("connection error".mysqli_connect_error());
}
    if(isset($_POST["submit"]))
    {
        $name=$_POST["name"];
        $details=array(
            array($_FILES["images1"]["name"],$_FILES["images1"]["tmp_name"],$_FILES["images1"]["size"],$_FILES["images1"]["error"]),
            array($_FILES["images2"]["name"],$_FILES["images2"]["tmp_name"],$_FILES["images2"]["size"],$_FILES["images2"]["error"]),
            array($_FILES["images3"]["name"],$_FILES["images3"]["tmp_name"],$_FILES["images3"]["size"],$_FILES["images3"]["error"]),
            array($_FILES["images4"]["name"],$_FILES["images4"]["tmp_name"],$_FILES["images4"]["size"],$_FILES["images4"]["error"])
        );
        $flag=0;
        function upload_image($file_name,$tempname,$image_size,$error)
        {
            global $name,$flag;
         if($error === 0)
            {
                $image_size;
                $img_ext=pathinfo($file_name, PATHINFO_EXTENSION);
                $img_ext_lc=strtolower($img_ext);
                $allowed_exts=array("jpg","jpeg","png","webp");
                if(in_array($img_ext_lc,$allowed_exts))
                {
                    $new_file_name=uniqid("IMG-",true).'.'.$img_ext_lc;
                    $folder="Images/".$new_file_name;
                    move_uploaded_file($tempname,$folder);
                    return $new_file_name;
                }
                else{
                    $em="Selected file type is not allowed";
                    $flag=1;
                    echo $em;
                }
            }
        }
        if($flag==0){
        $img_array=array(upload_image($details[0][0],$details[0][1],$details[0][2],$details[0][3]),
        upload_image($details[1][0],$details[1][1],$details[1][2],$details[1][3]),
        upload_image($details[2][0],$details[2][1],$details[2][2],$details[2][3]),
        upload_image($details[3][0],$details[3][1],$details[3][2],$details[3][3]));
        $sql="INSERT INTO product_details (name,category,image1,image2,image3,image4) VALUES ('$name','','$img_array[0]','$img_array[1]','$img_array[2]','$img_array[3]')";
                    $query=mysqli_query($conn,$sql);
                    if($query)
                    {
                        echo "image uploaded";
                    }
                }else{
                    header("Location:upload.php");
                }
    }
?>
<html>
    <body>
        <form method="POST" enctype="multipart/form-data">
            Name:<input type="text" name="name"   /><br />
            <input type="file" name="images1" /><br />
            <input type="file" name="images2" /><br />
            <input type="file" name="images3" /><br />
            <input type="file" name="images4" /><br />
            <input type="submit" name="submit" />
        </form>
        <div>
            <?php
            $res=mysqli_query($conn,"SELECT * FROM vegetable_details");
            while($rows = mysqli_fetch_assoc($res)) { 
            ?>
            <h1><?php echo $rows['name'] ?></h1>
            <img src="Images/<?php echo $rows['image1'] ?>" height="300px" width="300px" />
            <img src="Images/<?php echo $rows['image2'] ?>" height="300px" width="300px" />
            <img src="Images/<?php echo $rows['image3'] ?>" height="300px" width="300px" />
            <img src="Images/<?php echo $rows['image4'] ?>" height="300px" width="300px" />
            <?php } ?>
        </div>
    </body>
</html>