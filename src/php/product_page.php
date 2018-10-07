<?php
$id = $_GET['page'];
$url = 'http://www.imvu.com/shop/web_browse.php?cat=106&page=' . $page;
$content = file_get_contents($url);
echo $content;
?>