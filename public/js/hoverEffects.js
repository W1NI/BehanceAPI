// Button hover effect for the main buttons. Makes a full width div appear in button.
$(".button").hover(function(){
		$(this).find(".buttonHoverEffect").css("width","100%");
	},
	function(){
		$(this).find(".buttonHoverEffect").css("width","0%");
	}
);

// Menu list hover function. Displays a thin block beneath the list item name.
$(".menuListItem").hover(function(){
		$(this).find(".listHover").css("width","100%");
	},
	function(){
		$(this).find(".listHover").css("width","0%");
	}
);
