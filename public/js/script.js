var key = "XqSppMaVDo8FdJv4ixu7OuFqYkl4gWXg";

$.ajax({
	url: "http://behance.net/v2/users/charliematina?api_key=XqSppMaVDo8FdJv4ixu7OuFqYkl4gWXg&callback=myCallbackFunction",
	contentType: "application/json",
	dataType: "jsonp",
	success: function(data){
		console.log(data);
	},
	error: function(){
		console.log("Error with ajax request");
	}
});

$("#hamburgerMenu").click(function(){
	$("#logoContainer").css('z-index','60');
	$("#overlayMenu").fadeIn(300);
	$("body").css('overflow','hidden');
});

$("#closeMenu").click(function(){
	$("#overlayMenu").fadeOut(300);
	$("body").css('overflow','auto');
});
