/**
 * 2015-01-4 18:55
 * Fszer
 * License MIT | http://opensource.org/licenses/MIT
 */

var model;
$(document).ready(function () {
    setDate(document.getElementById('date_div'));

    chrome.topSites.get(function (topSitesArray) {
        // set background
        $('ul#topSites').append(setTopSites(topSitesArray));
    });
    initBgImg();

    model=[$('#one'), $('#rand'), $('#nomal')];
    var fileList;
    $('#imgurl').change(function () {
        fileList = document.getElementById('imgurl').files[0];
        if (fileList.type.indexOf("image") !== -1) {
            imgView(fileList);
        } else {
            fileList = "";
        }

    });


    $('#more').mousedown(function () {
        var option = $('#option');
        iconInit();
        if ("none" === option.css("display")) {
            option.slideDown("fast");
        } else {
            option.slideUp("fast");
        }
    });

    $('#up').mousedown(function () {
        if (fileList.type.indexOf("image") !== -1) {
            var reader = new FileReader();
            reader.readAsDataURL(fileList);
            reader.onload = function () {

                chrome.storage.local.set({"img": reader.result}, function () {
                    location.reload();
                });


            };
        }
    });

    $('.act-btn').mousedown(function () {
        changeButton($(this));
    });

});



setImg = function (image) {
    $('body').css({
        'background-image': 'url(' + image + ')'
    });
};
defaultImg = function () {
    var images = ["001.jpg", "002.jpg", "003.jpg", "004.jpg",
        "005.jpg", "006.jpg", "007.jpg", "008.jpg"];
    return "/img/bg/" +
        images[Math.floor(Math.random() * images.length)];

};
initBgImg = function () {

    var type = localStorage["type"] ? localStorage["type"] : 3;
    if (type === '1') {
        var res;
        chrome.storage.local.get("img", function (result) {
            res = result ? result['img'] : defaultImg();
            setImg(res);
        });

    } else if (type === '2') {

        var Rand = 386 + Math.floor(Math.random() * 14);
        var urls = "http://desk.zol.com.cn/showpic/1920x1080_50" + Rand + "_14.html";
        $.ajax({
            url: urls,
            success: function (data) {
                var er = document.createElement('div');
                er.innerHTML = data;
                setImg(er.firstChild.src);
            },
            error: function () {
                setImg(defaultImg());
            },
            dateType: "html"
        });

    } else if (type === '3') {

        setImg(defaultImg());

    }
};
setDate = function (date_div) {
    var today = new Date();
    var y = today.getFullYear();
    var mon = today.getMonth() + 1;
    var d = today.getDate();
    mon = mon >= 10 ? mon : ('0' + mon);
    date_div.innerHTML = y + "." + mon + "." + d;
    my_clock(document.getElementById('clock_div'), today);
};
my_clock = function (clock_div, today) {
    var h = today.getHours();
    var m = today.getMinutes();
    m = m >= 10 ? m : ('0' + m);
    clock_div.innerHTML = h + ":" + m;
    setTimeout(function () {
        today = new Date();
        my_clock(clock_div, today);
    }, 10000);
};
imgView = function (file) {
    var img = window.webkitURL.createObjectURL(file);
    var str = "<img src='" + img + "'>";
    $('#preview').html(str);
};
getActive = function () {
    var type = localStorage["type"] ? localStorage["type"] : 3;

   return model[type];
};
changeButton = function (el) {
    var act = getActive();
    var icon = '<i class=" am-icon-check-square"></i>';
    act.children("i")[0].remove();
    act.removeClass("am-active ");
    el.addClass("am-active ");
    el.append(icon);
    localStorage["type"] = el.val();
};
setTopSites = function (topSitesArray) {
    var sites = [];
    var length = topSitesArray.length >= 8 ? 7 : topSitesArray.length;
    for (var i = 0; i <= length; i++) {
        sites.push('<li><a href="' + topSitesArray[i].url +
                    '" class="top">' + topSitesArray[i].title + '</a></li>');
    }
    return sites;
};

iconInit= function () {
    var act = getActive();
    var icon = '<i class=" am-icon-check-square"></i>';
    act.addClass("am-active");
    act.append(icon);
    window.iconInit = function () {
        return 0;
    }
};


