<?php
header('content-type:text/html;charset=uft-8');
$username = $_POST['username'];
$password = $_POST['password'];

$link = mysqli_connect('localhost','root','root','xiaomi');
$res = mysqli_query($link,"SELECT * FROM `users` WHERE `username`='$username' AND `password`='$password'");

$result = mysqli_fetch_assoc($res);

mysqli_close($link);
$arr = array('username'=>$username,'password'=>$password,'message'=>'1');
if($result){
    echo json_encode($arr);
}else{
    echo "0";
}
?>