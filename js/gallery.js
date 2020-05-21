//jsonファイルの読み込み
//var lists;
var page;
var json;
var jsonList;

var loadjson = function () {
    $.getJSON('js/gallery.json') // json読み込み開始
        .done(function (json) { // jsonの読み込みに成功した時
            console.log('読み込み成功')
            jsonList = json;
        })
        .fail(function () { // jsonの読み込みに失敗した時
            console.log('失敗');
        });

};

$(window).on('load', function () {
    loadjson();
});


//表示の遅延書き込み
var delayOpen = function () {
    i = 0;
    delaySpeed = 25;

    //配列に格納
    var list = new Array();
    console.log(jsonList);
    for (var i = 0; i < jsonList[page].length; i++) {
        list[i] = '<li class="list ' +
            jsonList[page][i].size + '"><a data-fancybox="gallery" href="images/photo/' +
            jsonList[page][i].filename + '"><img class="hidden" src="images/photo/' +
            jsonList[page][i].thum_name + '" alt="' +
            jsonList[page][i].alt + '"></a></li>';
    };
    //.lists内に書き出し
    var j = list.length - 1;
    var i = 0;
    var lists = "";
    while (i <= j) {
        lists = lists + list[i];
        i++;
    };
    $('.lists').html(lists);

    $('.lists img').each(function (i) {
        $(this).delay(i * (delaySpeed)).queue(function () {
            $(this).removeClass('hidden');
        });
    });
};

//遅延消去
var delayClose = function () {
    var i = 0;
    console.log(i);
    //delaySpeed = 25; clickの中に記述
    $('.lists img').each(function (i) {
        $(this).delay(i * (delaySpeed)).queue(function () {
            $(this).addClass('hidden');
        });
        $(this).dequeue()
        queueCount();
    });
};

var queueCount = function () {
    console.log($('.lists img').queue().length);
}


$('.photo_nav a').on('click', function () {
    page = $(this).attr('href');//写真のカテゴリーをhrefから読み込む
    delaySpeed = 20;//1枚当たりのディレイアウトの時間
    var delayTime = $('.lists img').length * delaySpeed;//1枚の時間×枚数

    //クリック時に#photographにスクロール
    var photoPosi = $('#photograph').offset().top;
    $('html,body').stop(true, true).animate({ scrollTop: photoPosi }, delayTime, 'swing');//フェードアウト中にスクロール


    var d = new $.Deferred();//★こことresolveは要復習
    //フェードアウト実行
    delayClose();

    //フェードインの準備
    async(function () {
        delayOpen();
        d.resolve();
    });

    //フェードアウト実行後フェードイン
    function async(n) {
        setTimeout(n, delayTime);
    }
    return false;

});


