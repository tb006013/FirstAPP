window.onload = function(){
swiper();
imgload();

//轮播图
function swiper(){
		var mySwiper = new Swiper ('.swiper-container', {
		     pagination: '.swiper-pagination',
       		 paginationClickable: true,
       		 autoplay: 2500,
       		  spaceBetween:0,
		    // 如果需要分页器
		    pagination: '.swiper-pagination',
		    // 如果需要前进后退按钮
		    // nextButton: '.swiper-button-next',
		    // prevButton: '.swiper-button-prev',		    
		    // 如果需要滚动条
		    // scrollbar: '.swiper-scrollbar',
  		})        
	}
//img-lazylaod
function imgload(){
		$('img.lazy').lazyload({
			 effect : "fadeIn",
			container:$('.connect')
		});
	}

//go-back-top
$('.fixed-top').hide();
$(window).on('touchmove',function(event) {
	$('.fixed-top').backTop({
	container:$('.connect')
		});
	});

//点击搜索事件，页面与搜索页面交互
$('#search').on('touchstart', function(event) {
	if($(this).prop('class') == 'glyphicon glyphicon-search'){
		$(this).prop('class','glyphicon glyphicon-remove');
		$('.search').show();
		$('.connect').hide();
		$('header div:nth-child(2)').text('商品搜索');
	}else if($(this).prop('class') == 'glyphicon glyphicon-remove'){
		$(this).prop('class','glyphicon glyphicon-search');
		$('.search').hide();
		$('.connect').show();
		$('header div:nth-child(2)').text('OYA商城');
	}
	event.preventDefault();
	/* Act on the event */
	});

}