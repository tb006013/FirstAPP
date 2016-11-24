window.onload = function(){
	var objgood;
	var objcomment;
	var idNum = GetQueryString("id");
	var objs = window.localStorage.getItem('goods');
	if(objs){
			obj = JSON.parse(objs);
			var max = 0;
			obj.forEach(function(current){
				max += current.num;
			$('.goods-num').text(max);
		})
	}
	//获取商品数据
	$.ajax({
		url:JUZUIUrl,
		type:"get",
		success:function(data){
			objgood = JSON.parse(data);
			Goods.init(objgood);
		}
	})
	//获取评论数据
	$.ajax({
		url:commentUrl,
		type:"get",
		success:function(data){
			objcomment = JSON.parse(data);
			Comments.init(objcomment);
		}
	})

	//初始化详情页面
	var str='';
	var strs='';
	function getGoods(){
		var _this = this;
	}
	getGoods.prototype = {
		constuructor :getGoods,
		init:function(opt){
			opt.forEach(function(current){
				if(current.id == idNum){
					current.img.forEach(function(imgurl){
						$('<div class="swiper-slide"><a href=""><img src="'+imgurl+'"></a></div>').appendTo($('.swiper-wrapper'));
							$('<div class="swiper-pagination"></div>').appendTo($('.swiper-container'));
					});
					$('<p>' + current.title + '</p>').appendTo($('.part-top'));
					$('<p><span>' + current.money + '</span></p>').appendTo($('.part-top'));
					$('<ul><li><span>品牌名称:</span><span>' + current.brandname + '</span></li><li><span>商品名称:</span><span>' + current.goodsname + '</span></li><li><span>产地:</span><span>' + current.place + '</span></li><li><span>材质:</span><span>' + current.stuff + '</span></li><li><span>洗涤说明:</span><span>' + current.wash + '</span></li></ul>').appendTo($('.part-middle'));
					$('<img src="'+ current.infro + '">').appendTo($('.part-bottom'));
					swiper();
					str = '{"id":"' + current.id + '","price":"' + current.money + '","url":"' + current.cover + '","title":"' + current.title + '","num":"' + 1 + '"}';
				}
			})
		},
		storage:function(){
			var opt = Goods.select();
			var result = window.localStorage.getItem('goods');
			result = JSON.parse(result);
			if(opt == false){
				var arr = [];
				if(result == null){
					// arr.push(str);
					str = '[' + str + ']';
					window.localStorage.setItem('goods',str);
					Goods.update();
				}else{
					str = JSON.parse(str);
					result.push(str);
					// console.log(result);
					result = JSON.stringify(result);
					window.localStorage.setItem('goods',result);
					Goods.update();
				}
				// if(this.)
			}else{
				Goods.add(opt);
			}
		},
		add:function(opt){
			var _opt = window.localStorage.getItem('goods');
			var yy = JSON.parse(_opt);
			var arr = [];
			$.each(yy,function(index, el) {
				if(el.id == idNum){
					el.num = parseInt(el.num)+1;
				}
				arr.push(el);
			});
			yy = JSON.stringify(arr);
			window.localStorage.setItem('goods',yy);
			Goods.update();
		},
		update:function(){
			var _opt = window.localStorage.getItem('goods');
			_opt = JSON.parse(_opt);
			var max = 0;
			$.each(_opt,function(index,el){
				max +=el.num;
			})
			$('.goods-num').text(max);
		},
		select:function(){
			var resultArray = window.localStorage.getItem('goods');
			if(resultArray == null){
				return false;
			}else{
				resultArray = JSON.parse(resultArray);
			}		
			var num = false;
			$.each(resultArray,function(index,obj) {
				// console.log(obj);
				if(obj.id == idNum){
					num = obj;
				}
			});
			return num;
		}
	}
	var Goods = new getGoods();

//初始化评论页面
	function getComment(){
		var _this = this;
	}
	getComment.prototype = {
		constructor:getComment,
		init:function(opt){
			opt.forEach(function(cot){
				var _html = '<ul>';
				_html += '<li><span class="head"><img src="' + cot.imghead + '"></span><span>' + cot.name + '</span><span>' + cot.commentTime + '</span></li>';
				_html +='<li><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span></li>'
				_html +='<li><span>' + cot.comment + '</span></li>';
				_html +='<li><span>购买日期：</span><span>' + cot.buyDate + '</span></li>';
				_html += '</ul>';
				$('' + _html + '').appendTo($('.comment'));
			})
		}
	}

var Comments = new getComment();

//通过正则表达式获取地址栏参数	
	function GetQueryString(name)
	{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
	}

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

	//详情页和评论页交互
	$('#titlebtn a').each(function(index){
		$(this).on('touchstart',function(){
			$(this).addClass('active').siblings().removeClass('active');
			$('.part').eq(index).show().siblings('.part').hide();
		})
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

	//存储信息到local
	$('#add').on('touchstart',function(){
		Goods.storage();
	})
}