requirejs.config({
	paths:{
		jquery:'jquery-3.1.1.min'
	}
});

require(['jquery','backTop'],function($,backTop){
	// new backTop.BackTop($('#backTop'),{
	// 	mode:'move',
	// 	pos:100,
	// 	speed:2000
	// });
	$('#backTop').backTop({
		mode:'move',
		dest:500
	});
});