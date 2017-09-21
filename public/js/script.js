var key = "PyMFCmfAybdTvwclB5XacPZxqbSOpYKV";
// var url =  "http://behance.net/v2/users/"+behanceID+"?api_key="+key+"&callback=myCallbackFunction";

function getBehanceData(behanceID){
	$.ajax({
		url: "http://behance.net/v2/users/"+behanceID+"?api_key="+key+"&callback=myCallbackFunction",
		contentType: "application/json",
		dataType: "jsonp",
		success: function(data){
			console.log(data);
			var profileImage = data.user.images[276];
			var profileDisplayName = data.user.display_name;

			$("#teamContent").append(
					"<div class='teamProfileContainer'>"+
						"<div class='profileImage'>"+
							"<img src='"+profileImage+"' alt='profil image'>"+
						"</div>"+
						"<div class='teamMemberName'>"+profileDisplayName+"</div>"+
					"</div>"
				)
		},
		error: function(){
			console.log("Error with ajax request");
		}
	});
}

$.get( "http://localhost:3000/behanceIDs", function(data) {
	for (var i = 0; i < data.length; i++) {
		var behanceID = data[i].behanceID;
		getBehanceData(behanceID);
	}
});

$(document).ready(function(){
    $(this).scrollTop(0);
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

$(".waveContainer").fadeIn(1000);

$("#landingPageContainer").fadeIn(600);

$("#logo").click(function(){
	scrollToTop();
})

scrollLoad("#serviceContent", 200, 1000);
scrollLoad("#teamContent", 800, 1000);
scrollLoad("#contactContent", 1200, 1000);

// Function which loads elements on scroll.
function scrollLoad(element, value, timer){
	$(window).bind('scroll', function () {
	    if ($(window).scrollTop() > value) {
	        $(element).fadeIn(timer);
	    }
	});
}

/*Scrolls to top*/
function scrollToTop(){
	$('html, body').animate({scrollTop: 0}, 600);
}
