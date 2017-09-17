var key = "XqSppMaVDo8FdJv4ixu7OuFqYkl4gWXg";

$.ajax({
	url: "http://behance.net/v2/users/charliematina?api_key=XqSppMaVDo8FdJv4ixu7OuFqYkl4gWXg&callback=myCallbackFunction",
	contentType: "application/json",
	dataType: "jsonp",
	success: function(data){
		console.log(data);
		var profileImage = data.user.images[276];
		console.log(profileImage);
		$("body").append(`<img src =${profileImage}>`)
	},
	error: function(){
		console.log("IT'S ERROR DAY BRO");
	}
});