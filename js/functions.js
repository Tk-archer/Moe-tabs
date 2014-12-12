/**
 * 2014-05-19 23:22
 * Phoenix Nemo <i at phoenixlzx dot com>
 * License MIT | http://opensource.org/licenses/MIT
 */

setimg = function(image) {
    $('body').css({
        'background-image': 'url(' + image + ')'
    });
};

bgimg = function() {

    type = localStorage["type"] ? localStorage["type"] : 3;
    if (type === 1) {

        setimg(localStorage["img"]);

    } else if (type === 2) {

        var rande = 386 + Math.floor(Math.random() * 14);
        var urls = "http://desk.zol.com.cn/showpic/1920x1080_50" + rande + "_14.html";
        $.ajax({
            url: urls,
            success: function(data, status) {
                var er = document.createElement('div');
                er.innerHTML = data;
                setimg(er.firstChild.src);
            },
            dateType: "html"
        });

    } else if (type === 3) {

        var images = ["001.jpg", "002.jpg", "003.jpg", "004.jpg", "005.jpg", "006.jpg", "007.jpg", "008.jpg"];
        var rands = "/img/bg/" + images[Math.floor(Math.random() * images.length)];
        setimg(rands);

    }
};
setDate = function(el) {
    var today = new Date();
    var y = today.getFullYear();
    var mon = today.getMonth() + 1;
    var d = today.getDate();
    mon = mon >= 10 ? mon : ('0' + mon);
    el.innerHTML = y + "." + mon + "." + d;
    my_clock(document.getElementById('clock_div'), today);
};

my_clock = function(argument, today) {
    var h = today.getHours();
    var m = today.getMinutes();
    m = m >= 10 ? m : ('0' + m);
    argument.innerHTML = h + ":" + m;
    setTimeout(function() {
        today = new Date();
        my_clock(argument, today);
    }, 10000);
};
imgview = function(file) {

    var img = window.webkitURL.createObjectURL(file);
    var str = "<img src='" + img + "'>";
    $("#preview").html(str);

};

getActive=function() {
    type=localStorage["type"]?localStorage["type"]:3;
        switch(type){
            case '1':
                return $('#one');
                break;
            case '2':
                 return $('#rand');
                break;
            case '3':
                 return $('#nomal');
                break;
            default:
                    localStorage["type"]=type;
                    return $('#nomal');
                    break;
            
        }
};

changeButton=function  (el) {
   var act=getActive();
        var old=act.children("i")[0];
        var news=old.cloneNode();
        act.removeClass("am-active ");
        old.remove();
        el.addClass("am-active ");
        el.append(news);
        localStorage["type"]=el.val();
        
};
function init() {

    chrome.topSites.get(function(topSitesArray) {
        // set background
        bgimg();
        var sites = [],
            i = 0;

        if (topSitesArray.length >= 8) {

            for (i = 0; i <= 7; i++) {

                sites.push('<li><a href="' + topSitesArray[i].url + '" class="top">' + topSitesArray[i].title + '</a></li>');

            }

        } else {

            for (i = 0; i < topSitesArray.length; i++) {

                sites.push('<li><a href="' + topSitesArray[i].url + '" class="top">' + topSitesArray[i].title + '</a></li>');

            }

        }


        $('ul#topSites').append(sites);
        var sdd=getActive();
        var sd='<i class=" am-icon-check-square"></i>'
        sdd.addClass("am-active");
        sdd.append(sd);
    });


};

/*chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message[0] == "img") {
        localStorage[message[0]] = message[1];
    }
});
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message[0] == "type") {
        localStorage[message[0]] = message[1];
    }
});*/


init();


$(document).ready(function() {
    setDate(document.getElementById('date_div'));
    var fileList;
    $('#imgurl').change(function(argument) {
        fileList = document.getElementById('imgurl').files[0];
        if (fileList.type.indexOf("image") !== -1) {
            imgview(fileList);
        } else {
            fileList = "";
        }

    });

    $(document).on({
        dragleave: function(e) { //拖离 
            e.preventDefault();
        },
        drop: function(e) { //拖后放 
            e.preventDefault();
        },
        dragenter: function(e) { //拖进 
            e.preventDefault();
        },
        dragover: function(e) { //拖来拖去 
            e.preventDefault();
        }
    });

    var box = document.getElementById('drop_area'); //拖拽区域 
    box.addEventListener("drop", function(e) {
        e.preventDefault(); //取消默认浏览器拖拽效果 
        fileList = e.dataTransfer.files[0]; //获取文件对象 

        if (fileList.type.indexOf("image") !== -1) {
            imgview(fileList);
        } else {
            fileList = "";
        }
    }, false);

    $('#more').mousedown(function() {
        if ($("#option").css("display") === "none") {
            $('#option').slideDown("fast");
        } else {
            $('#option').slideUp("fast");
        }
    });

    $('#up').mousedown(function() {
        if (fileList.type.indexOf("image") !== -1) {
            var reader = new FileReader();
            reader.readAsDataURL(fileList);
            reader.onload = function() {
                localStorage["img"] = reader.result;
                location.reload();
                
            }
        };
    });

    $('#one').mousedown(function () {
        changeButton($(this));
    });
     $('#rand').mousedown(function () {
        changeButton($(this));
    });
      $('#nomal').mousedown(function () {
        changeButton($(this));
    });
});

