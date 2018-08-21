var caroussel = {
	nbSlide : 0,
	nbCurrent : 1,
	elemCurrent : null,
	elem:null,
	timer : null,

	init : function(elem){
		// alert(nbSlide);
		this.nbSlide = elem.find('.picture').length;
		// alert(nbSlide);

		elem.append("<div class = 'cercles'></div>");
		for (var i = 1; i <= this.nbSlide; i++){
			elem.find(".cercles").append("<span>"+"</span>")
		}
		elem.find('.cercles span').click(function(){caroussel.gotoSlide(parseInt($(this).text()));})


		this.elem = elem;
		elem.find('.picture').hide();
		elem.find('.picture:first').show();
		// alert(elem.find('picture:first'));
		this.elemCurrent = elem.find('.picture:first');
		this.elem.find('.cercles span:first').addClass('active');

		// ces 4 lignes de codes sont à revoir..
		this.timer = window.setInterval("caroussel.next()", 2000);
		caroussel.replay();

		elem.on('mouseover', caroussel.stop());
		elem.mouseout(caroussel.replay());
	},

	gotoSlide : function(num){
		if (num== this.nbCurrent){return false;}
		// alert(num);
		this.elemCurrent.fadeOut(1000);
		this.elem.find('#slide'+num).fadeIn(1000);
		this.elem.find('.cercles span').removeClass('active');
		this.elem.find('.cercles span:eq('+(num-1)+')').addClass('active');
		this.nbCurrent = num;
		this.elemCurrent = this.elem.find('.picture:eq('+ (num - 1) +')');
	},

	next : function(){
		var num = this.nbCurrent + 1;
		if (num > this.nbSlide){
			num = 1;
		}
		this.gotoSlide(num);
	},

	prev : function(){
		var num = this.nbCurrent - 1;
		if (num < 1){
			num = this.nbSlide;
		}
		this.gotoSlide(num);
	},

	stop : function(){
		window.clearInterval(caroussel.timer);
	},

	replay : function(){
		window.clearInterval(caroussel.timer);
		this.timer = window.setInterval("caroussel.next()", 5000);
	}

}

$(document).ready(function(){	
	caroussel.init($('#caroussel'));
	// alert($('#caroussel').find('.picture'));

});