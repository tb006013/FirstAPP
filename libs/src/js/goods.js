window.onload = function(){
	var obj;
	getJson();
	function getJson(){
		$.ajax({
		url:JUZUIUrl,
		type:"get",
		success:function(data){
				obj = JSON.parse(data);
				console.log(obj);
				goods.init(obj);
			}
		})
	}

	function goodsList(){
		var _this = this;
	}
	goodsList.prototype ={
		constructor:goodsList,
		init:function(obj){
			obj.forEach(function(current){
				console.log(current.id);
				$('<a href="about-goods.html?id=' + current.id + '"><img src="' + current.cover + '"><p>' + current.title + '</p><p><span>' + current.money + '</span></p></a>').appendTo($('.goods-list'));
			})		
		}
	}
	var goods = new goodsList();

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

//滚动请求ajax获取数据
$('.connect').scroll(function(event) {
		var scrolllength = $('.goods-list')[0].scrollHeight - $(this).scrollTop();
		if(scrolllength == $(this).height()){
			getJson();
		}
	/* Act on the event */
});

//导航栏的选择
$('.list-title .row div').each(function(index,event){
	$(this).on('touchstart',function(){
		console.log($('.part').eq(index));
		if($('.part').eq(index).css('display') == 'none'){
			$('.part').eq(index).show().siblings('.part').hide();
			$('.connect').hide();
			$(this).find($('i')).prop('class','glyphicon glyphicon-chevron-up').css({'color':'#8e488e'}).end().siblings().find('i').prop('class','glyphicon glyphicon-chevron-down').css({'color':'#000'});
		}else if($('.part').eq(index).css('display') == 'block'){
			$('.part').eq(index).hide();
			$('.connect').show();
			$(this).find($('i')).prop('class','glyphicon glyphicon-chevron-down').css({'color':'#000'});
		}
	})
})

//kind-list下的事件
$('.kind-list .level1 li').each(function(index){
	$(this).on('touchstart',function(){
		$(this).addClass('active').css({'color':'#e80080'}).siblings().removeClass('active').css({'color':'#000'});
		$('.level2 li').eq(index).show().css({'color':'#e80080'}).siblings().hide();
		$('.level3 li').hide();
		$('.level2 li').eq(index).on('touchstart',function(){
			$('.level3 li').eq(index).css({'color':'#e80080'}).show().siblings().hide().css({'color':'#000'});
		})
	})
})
}