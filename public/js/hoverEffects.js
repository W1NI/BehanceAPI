$(".button").hover(function(){
		$(this).find(".buttonHoverEffect").css("width","100%");
	},
	function(){
		$(this).find(".buttonHoverEffect").css("width","0%");
	}
);
