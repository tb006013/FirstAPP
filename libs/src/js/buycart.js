window.onload = function(){
	var Num;
	var Price =[]; 
	var reNum =[];
	//将数据初始化呈现
	var opt = JSON.parse(window.localStorage.getItem('goods')) || null;
	if(opt){
		opt.forEach(function(data){
		var _html = '<li>';
		_html += '<div class="list-left"><div><span class="glyphicon glyphicon-ok-sign" alt="commit"></span></div>';
		_html += '<img src="' + data.url + '"></div>';
		_html += '<div class="list-right"><div>' + data.title + '</div>';
		_html +=	'<div><span class="pricepart">￥' + data.price + '</span><span class="numpart"><span class="glyphicon glyphicon-minus"></span><span>' + data.num + '</span><span class="glyphicon glyphicon-plus"></span><span class="glyphicon glyphicon-trash"></span></span></div>';
		_html += '</div></li>';
		$('' + _html + '').appendTo($('.connect ul'));
			Price.push(data.price);
			reNum.push(data.num);
			changeData(data.price,data.num)
		})
	}

	function changeData(price,num){
		$('.fin-price').text(price * num);
	}

	//增加与减少数量
	$('.numpart span:nth-child(1)').each(function(index, el) {
		$(this).on('touchstart', function(event) {
			if($('[alt=commit]').eq(index).prop('class') == 'glyphicon glyphicon-ok-sign'){
				Num =  $(this).next().text();
				Num = Num>0 ? --Num : 0;
				$(this).next().text(Num);
				changeData(Price[index],Num);
				event.preventDefault();
				/* Act on the event */
			}
		});
	});

	$('.numpart span:nth-child(3)').each(function(index,el){
		$(this).on('touchstart', function(event) {
			if($('[alt=commit]').eq(index).prop('class') == 'glyphicon glyphicon-ok-sign'){
			Num =  $(this).prev().text();
			++Num;
			$(this).prev().text(Num);
			changeData(Price[index],Num);
			event.preventDefault();
			/* Act on the event */
			}
		});
	})
	$('.numpart span:nth-child(4)').on('touchstart',function(event){
		$(this).parents('li').remove();
		window.localStorage.removeItem('goods');
	})

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

	//勾选
	$('[alt=commit]').each(function(index,el){
			$(this).on('touchstart',function(){
				if($(this).prop('class') == 'glyphicon glyphicon-ok-sign'){
					$(this).removeClass('glyphicon glyphicon-ok-sign');
					changeData(0,0);
				}else if($(this).prop('class') == ''){
					$(this).addClass('glyphicon glyphicon-ok-sign');
					var num = $('.numpart span:nth-child(2)').text();
					var price = Price[index];
					changeData(price,num);
				}
		})
	})
	//全选
	$("#all").on('touchstart',function(){
		$('[alt=commit]').each(function(index){
			if($('[alt=commit]').prop('class') == 'glyphicon glyphicon-ok-sign'){
			$('[alt=commit]').removeClass('glyphicon glyphicon-ok-sign');
					changeData(0,0);
		}else if($('[alt=commit]').prop('class') == ''){
			$('[alt=commit]').addClass('glyphicon glyphicon-ok-sign');
			var num = $('.numpart span:nth-child(2)').text();
			var price = Price[index];
			changeData(price,num);
			}
		})
	})
}