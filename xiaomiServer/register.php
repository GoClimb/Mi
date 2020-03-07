<?php
header('content-type:text/html;charset=uft-8');
 $username = $_POST['username'];
 $password = $_POST['password'];



$link = mysqli_connect('localhost','root','root','xiaomi');


$res = mysqli_query($link,"INSERT INTO `users` (`username`,`password`) VALUES('$username','$password')");


 mysqli_close($link);

if($res==1){
    echo "1";
}else{
    echo "2";
}


?>