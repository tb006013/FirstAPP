window.onload = function(){
	var dataJson;
	getJson();
	function getJson(){
		$.ajax({
		url:jsonUrl,
		type:'get',
		beforeSend:function(){
			loadingShow();
		},
		success:function(data){
			dataJson =  JSON.parse(data);
			show.init(dataJson);
			loadingHide();
			}
		})
	}
	function showData(data){
		var _this = this;
	}
	showData.prototype={
		constructor:showData,
		init:function(obj){
			$('.hot-brand1').find($('a')).remove();
			$('.hot-brand2').find($('a')).remove();
			obj[0].brand.forEach(function(current){
					$('<a href="goods.html"><img src="' + current.url + '"><div>' + current.name + '</div></a>').appendTo($('.hot-brand1'));
					$('<a href="goods.html"><img src="' + current.url + '"><div>' + current.name + '</div></a>').appendTo($('.hot-brand2'))
			})
		}
	}
	var show = new showData(dataJson);

	//获取数据前的效果
	function loadingShow(){
		var height = $('.connect').height();
		$('.loading').css({'height':height});
		$('.connect').css({'z-index':'-1'});
		$('.loading').show();
	}
	function loadingHide(){
		$('.connect').css({'z-index':'0'});
		$('.loading').hide();
	}

	//点击列表弹窗窗口
	$('#list').on('touchstart', function(event) {
		if ($('#list').attr('alt')=='hide') {
			$('.list-connect').show();
			$('#list').attr('alt','show');
		}else if($('#list').attr('alt')=='show'){
			$('.list-connect').hide();
			$('#list').attr('alt','hide');
		}
		event.preventDefault();
		/* Act on the event */
	});

	//点击列表获取数据
	console.log($('.list-left ul li').size());
	$('.list-left ul li').each(function(){
		$(this).on('click', function(event) {
			$(this).css({'background':'#f1f5f6','color':'#ff0000'}).siblings().css({'background':'#fff','color':'#000'});
			getJson();
			event.preventDefault();
			/* Act on the event */
		});
	})
}