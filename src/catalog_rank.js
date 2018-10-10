var cors_prefix = "https://cors-anywhere.herokuapp.com/";
var product_prefix = "https://www.imvu.com/shop/product.php?products_id=";
var avatar_prefix = "https://www.imvu.com/catalog/web_mypage.php?user=";

function getProductContent(productId) {
    return $.ajax({
        type: "GET",
        url: "php/product_info.php",
        data: {id: "" + productId},
        dataType: "html"
    });
}

function getAvatarContent(avatarId) {
    return $.ajax({
        type: "GET",
        url: "php/avatar_page.php",
        data: {id: "" + avatarId},
        dataType: "html"
    });
}

function setSceneProducts() {
    var scene = $("#hov").val();
    var reduxScene = scene.replace('http://www.imvu.com/catalog/' +
        'products_in_scene.php?', '');
    clearSceneProducts();
    getSceneProducts(reduxScene);
};

function getSceneProducts(scene) {
    var sceneSplit = scene.split('&');
    var sceneSeperations = [];
    for (const entity of sceneSplit) {
        sceneSeperations.push(entity.split('='));
    }

    for (var i = 0; i < sceneSeperations.length; i++) {
        sceneSeperations[i][1] = sceneSeperations[i][1].split('3B');
        for (var j = 0; j < sceneSeperations[i][1].length; j++) {
            sceneSeperations[i][1][j] = sceneSeperations[i][1][j].replace('%', '');
        }
    }

    for (const entity of sceneSeperations) {
        if (entity[0].includes('avatar')) {
            var avatarId = entity[0].split('avatar')[1];
            addProductBlock(avatarId);
            addProductHeader(true, avatarId);
            addSceneProducts(avatarId, entity[1]);
        } else {
            var roomId = 'Room';
            addProductBlock(roomId);
            addProductHeader(false, roomId);
            addSceneProducts(roomId, entity[1]);
        }
    }
};

function addSceneProducts(header, products) {
    for (const product of products) {
        addSceneProduct(header, product);
    }
};

function addSceneProduct(header, product) {
    //var productLink = product_prefix + product.split('x')[0];
    $.when(getProductContent(product.split('x')[0])).done(function(content) {
        var prodImg = $('#product-image', $(content)).attr("src");
        var imgInline = '<img src="' + prodImg + '">';
        var metaLink = $(content).filter("meta[property='og:url']");
        var link = metaLink.attr("content");
        var linkInLine = '<a href="' + link + '">' + imgInline + '</a>'; 
        $("#main ul#" + header).append('<li>' + linkInLine + '</li>');
    });
    /*
    $.get(cors_prefix + productLink, function(data) {
        var prodImg = $('#product-image', $(data)).attr("src");
        var imgInline = '<img src="' + prodImg + '">';
        var linkInLine = '<a href="' + productLink + '">' + imgInline + '</a>'; 
        $("#main ul#" + header).append('<li>' + linkInLine + '</li>');
        
    });
    */
};

function addProductHeader(isAvatar, header) {
    if (isAvatar) {
        //var avatarLink = avatar_prefix + header;
        $.when(getAvatarContent(header)).done(function(content) {
            var pageTitle = $(content).filter("title")[0].textContent;
            var avatarName = pageTitle.split('page: ')[1];
            $("#main p#" + header).append(avatarName);
        });
        /*
        $.get(cors_prefix + avatarLink, function(data) {
            var pageTitle = $(data).filter("title")[0].textContent;
            var avatarName = pageTitle.split('page: ')[1];
            $("#main p#" + header).append(avatarName);
        });
        */
    } else {
        $("#main p#" + header).append(header);
    }
};

function addProductBlock(header) {
    $("#main").append('<p id="' + header + '"></p>');
    $("#main").append('<ul style="list-style-type:none" id="' + header + '"></ul>');
};

function clearSceneProducts() {
    $("#main p").remove();
    $("#main ul").remove();
};
/*
$(document).ready(function () {
    var y = "Hi";
    $.when(getProductContent(42240714)).done(function(content) {
        console.log(x);
    });
});
*/