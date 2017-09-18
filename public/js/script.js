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
