<?php
$id = $_GET['id'];
$url = 'https://www.imvu.com/catalog/web_mypage.php?user=' . $id;
$content = file_get_contents($url);
echo $content;
?>