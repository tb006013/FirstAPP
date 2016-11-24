window.onload = function(){
	var obj = window.localStorage.getItem('user');
	var opt = JSON.parse(obj);
	opt.forEach(function(current){
		$('#user-id').text(current.id);
		$('#user-level').text(current.level);
		$('#mymoney').text(current.mymoney);
		$('#usermoney').text(current.usermoney);
		$('#replacemoney').text(current.replacemoney);		
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
}