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

// profile image hover effect
$(document).on('mouseover', '.profileImage', function(){
		$(".profileImage").addClass("spotlight");
		$(this).removeClass("spotlight").next(".teamMemberName").css("color","#0eedb9");

}).on('mouseout', '.profileImage', function(){
	$(".profileImage").removeClass("spotlight");
	$(this).next(".teamMemberName").css("color","white");
});

// Behance link hover effect
$(document).on('mouseover', '#behanceLink', function(){
	$(this).find(".linkHover").css("width","100%");
}).on('mouseout', '#behanceLink', function(){
	$(this).find(".linkHover").css("width","0%");
});
