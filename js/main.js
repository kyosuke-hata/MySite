$(function(){
 
	'use strict';
    //変数宣言
    let scrollPosi = 0;
    var bodyHeight;
    var navPosi;
    var palPosi01;
    var pal01Height;
    var pal01ImgHeight;
    var windowHeight;
    var pal02img;
    var pal02Height;
    var pal02move;


    //ここまで

    //読み込み時・ウィンドウサイズ変更時
    $(window).on('resize load',function(){
        var break01 = 768;
        var windowSize = window.innerWidth;
        console.log(windowSize);
        if(break01 <= windowSize){
            $('body').addClass('PC');
        }else{
            $('body').removeClass('PC');
        }
    });

    //sp用メニューボタン
    $("#btn_nav").on('click',function () {
        $("nav").slideToggle();

        if($(this).hasClass('open')){
            $(this).removeClass('open');
            //$('main').css('opacity','1');//半透明を戻す
        }else{
            $(this).addClass('open');
            //$('main').css('opacity','0.5');//ナビ開いたらmainを半透明に
        };

    });


    //スクロール時の処理
	$(window).scroll(function () {
        scrollPosi = $(document).scrollTop();//スクロール位置
        windowHeight = $(window).height();//windowの高さ
        var navHeight = $('.nav_box').height();//グロナビの高さ（念のため検出)

        //各セクションの位置
        var photoPosi = $('#photograph').offset().top;//写真
        var profPosi = $('#profile').offset().top;//自己紹介
        var contPosi =$('#contact').offset().top;//連絡先

        var photoTrans = photoPosi - navHeight;
        var profTrans = profPosi - (windowHeight / 4 * 3);
        var contTrans = contPosi - navHeight;


        //pcのグロナビ
        navPosi = $('header').height();//ヘッダーの高さ検出
        if($('body').hasClass('PC')){
            if(navPosi <= scrollPosi){
                $('.headbox .nav_box').addClass('fixed');
                //$('.palbox01').addClass('navfixed');
            }else{
                $('.headbox .nav_box').removeClass('fixed');
                //$('.palbox01').removeClass('navfixed');
            }

            if(scrollPosi >= photoTrans ){
                $('.nav_box').addClass('reverse');
            }else{
                $('.nav_box').removeClass('reverse');
            };
        }else{
            $('.nav_box').removeClass('reverse fixed');
            $('.palbox01').removeClass('navfixed');
        }
        
        //ヘッダー下パララックス
        palPosi01 = $('.palbox01').offset().top;//画面の上からの位置
        pal01Height = $('.palbox01').height();//領域の高さ
        pal01ImgHeight =$('.palbox01 img').height();//画像大きさ
        var pal01move = pal01ImgHeight - pal01Height;//移動距離（画像のはみだし）
        var pal01start = scrollPosi + windowHeight;//スタート判定
        var pal01Num = -pal01move / (palPosi01 + pal01Height) * scrollPosi;

        if(pal01start >= palPosi01 ){
            $('.palbox01 img').stop(true, true).animate({
                'bottom': pal01Num + 'px'
            }, 100);
        }


        //自己紹介のフェードイン
        if(scrollPosi >= profTrans){
            $('#profile .container').removeClass('hide');
        }else{
            $('#profile .container').addClass('hide');
        }
        //自己紹介背景のパララックス
        var profHeight = $('#profile').height();//領域の高さ
        var profImgHeight =$('#profile').width();//画像大きさ 縦横比1：1のため、横幅=高さとする
        var profmove = profImgHeight - profHeight;//移動距離（画像のはみだし）
        var profstart = scrollPosi + windowHeight;//スタート判定
        var profNum = -profmove / (profPosi + profHeight) * scrollPosi;
        var profDistance = 'left 0px bottom ' + profNum + 'px';
        if(profstart >= profPosi){
            $('#profile').css({
                "background-position" : profDistance
            },100);
        }
    });
    //スクロール時の処理ここまで



    //グロナビページ内リンク
    $('nav a[href^="#"]').click(function(){
        var ancPosi = $(document).scrollTop();//スクロール位置
        windowHeight = $(window).height();//windowの高さ
        var scSpeed = 1000;
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' :href);
        var position = target.offset().top;

        var scDistance =  position - ancPosi;

        if(scDistance <= 0 ){
            scDistance = -scDistance;
        };

        if( scDistance <= windowHeight ){
            scSpeed = scSpeed * 0.8 * (scDistance / windowHeight);
        };

        //グロナビ閉じる
        if(!$('body').hasClass('PC')){
            //console.log('PC')
            //}else{
            $("nav").slideToggle();
            $('#btn_nav').removeClass('open');
        };

        $('html,body').stop(true, true).animate({scrollTop:position},scSpeed,'swing');
        return false;
    });
    //ページ内リンクここまで

});

//ページ読み込み時
$(window).on('load',function(){
    $('body').addClass('show');
});

//scrollRevealの実行　スクロールしたらふんわり登場
//ScrollReveal().reveal('section');