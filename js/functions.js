/**
 * 2014-05-19 23:22
 * Phoenix Nemo <i at phoenixlzx dot com>
 * License MIT | http://opensource.org/licenses/MIT
 */

function init() {
    
    chrome.topSites.get(function(topSitesArray) {
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
        // set background
     
        
        
         

       
    }); 




}

bgimg=function(){
    images = ["001.jpg", "002.jpg", "003.jpg", "004.jpg", "005.jpg", "006.jpg", "007.jpg", "008.jpg"];
    //var rands ="/img/bg/" +images[Math.floor(Math.random() * images.length)];
    var rande=386+Math.floor(Math.random() * 14);
    var urls="http://desk.zol.com.cn/showpic/1920x1080_50"+rande+"_14.html";
  $.ajax({url:urls,success:function(data,status){
     var er= document.createElement('div');
     er.innerHTML=data;
     rands ="/img/bg/" +images[Math.floor(Math.random() * images.length)];
     img=er.firstChild.src?er.firstChild.src:rands;
    $('body').css({
           'background-image': 'url(' +img+ ')'
         //'background-image': 'url(' + url + ')'

        });
    },dateType:"html"});
};

setDate=function(el){
    var today = new Date();
    var y = today.getFullYear();
    var mon = today.getMonth();
    var d = today.getDate();
    mon = mon >= 10 ? mon : ('0' + mon);
    el.innerHTML = y + "." +mon+"."+d ;
    my_clock(document.getElementById('clock_div'),today);
}

my_clock = function(argument,today) {
    var h = today.getHours();
    var m = today.getMinutes();
    m = m >= 10 ? m : ('0' + m);
    argument.innerHTML = h + ":" + m;
    setTimeout(function() {
        today=new Date();
        my_clock(argument,today);
    }, 10000);
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message[0] == 1) {
        alert(save.user);
        save.user[getJsonLength(save.user)] = message[1];

        chrome.storage.local.set(save, function() {
            sendResponse("ok");
        });

    }
});

init();


$(document).ready(function() {
    setDate( document.getElementById('date_div'));

});

