<?php
libxml_use_internal_errors(true);
$id = $_GET['id'];
$url = 'http://www.imvu.com/shop/product.php?products_id=' . $id;
$content = file_get_contents($url);
echo $content;
?>