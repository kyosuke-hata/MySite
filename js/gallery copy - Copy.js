//jsonファイルの読み込み
var lists ="";
var page;
var delaySpeed;


var loadjson = function () {
    $.getJSON('js/gallery.json') // json読み込み開始
        .done(function (json) { // jsonの読み込みに成功した時
            //配列に格納
            var list = new Array();
            console.log(json);
            for (var i = 0; i < json[page].length; i++) {
                list[i] = '<li class="list ' +
                    json[page][i].size + '"><a data-fancybox="gallery" href="images/photo/' +
                    json[page][i].filename + '"><img class="hidden" src="images/photo/' +
                    json[page][i].thum_name + '"></a></li>';
            };
            //.lists内に書き出し
            var j = list.length - 1;
            var i = 0;
            while (i <= j) {
                console.log(list[i]);
                lists = lists + list[i];
                i++;
            };
            $('.lists').html(lists);
        })
        .fail(function () { // jsonの読み込みに失敗した時
            console.log('失敗');
        });

};


//表示の遅延書き込み
var delayOpen = function () {
    i = 0;
    //var delaySpeed = 25;
    $('.lists img').each(function (i) {
        $(this).delay(i * (delaySpeed)).queue(function () {
            $(this).removeClass('hidden');
        });
    });
};

//遅延消去
var delayClose = function () {
    i = 0;
    console.log(delaySpeed);
    //delaySpeed = 25;
    $('.lists img').each(function (i) {
        $(this).delay(i * (delaySpeed)).queue(function () {
            $(this).addClass('hidden');
        });
    });
};

$(window).on('load', function () {
    //loadjson();
});


$('.photo_nav a').click(function () {
    page = $(this).attr('href');
    delaySpeed = 25;
    var delayTime = $('.lists img').length * delaySpeed;
    console.log(delayTime);
    $.when(
        delayClose
    ).done(function() {
        loadjson;
        delayOpen;
    });
    return false;

});