define(['jquery','scrollTo'],function($,scrollTo){
	function BackTop(el,opts){
		this.opts=$.extend({},BackTop.DEFAULTS,opts);
		this.$el=$(el);
		this.scroll=new scrollTo.ScrollTo({
			dest:0,
			speed:this.opts.speed
		});

		this._checkPos();

		if(this.opts.mode=='move'){
		this.$el.on('click',$.proxy(this._move,this));
		}else{
		this.$el.on('click',$.proxy(this._go,this));
		}
		$(window).on('scroll',$.proxy(this._checkPos,this));
	}
	BackTop.DEFAULTS={
		mode:'move',
		pos:$(window).height(),
		speed:800
	}
	BackTop.prototype._move=function(){
		this.scroll.move();
	}
	BackTop.prototype._go=function(){
		this.scroll.move();
	}
	BackTop.prototype._checkPos=function(){
		var $el=this.$el;
		if($(window).scrollTop()>this.opts.pos){
			$el.fadeIn();
		}else{
			$el.fadeOut();
		}
	}


	$.fn.extend({
		backTop:function(opts){
			return this.each(function(){
				new BackTop(this,opts);
			});
		}
	})
	return{
		BackTop:BackTop
	}
});