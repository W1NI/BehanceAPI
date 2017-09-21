var key = "efkifBSBLRVmoHgF4YMUX2mvNKrYSTeP";

function getBehanceData(behanceID){
	$.ajax({
		url: "http://behance.net/v2/users/"+behanceID+"?api_key="+key+"&callback=myCallbackFunction",
		contentType: "application/json",
		dataType: "jsonp",
		success: function(data){
			var profileImage = data.user.images[276];
			var profileDisplayName = data.user.display_name;

			$("#teamContent").append(
					"<div class='teamProfileContainer'>"+
						"<div class='profileImage'>"+
							"<img src='"+profileImage+"' alt='profil image'>"+
						"</div>"+
						"<div class='teamMemberName'>"+profileDisplayName+"</div>"+
					"</div>"
				);
		},
		error: function(){
			console.log("Error with ajax request");
		}
	});
};

function getProjectImages(behanceID){
	$.ajax({
		url: "http://www.behance.net/v2/projects/56623139?client_id="+key,
		contentType: "application/json",
		dataType: "jsonp",
		success: function(data){
            var projectName = data.project.name;
            var projectUrl = data.project.url;
			var projectLikes = data.project.stats.appreciations;
			var projectComments = data.project.stats.comments;
			var projectViews = data.project.stats.views;
			var ownerImage = data.project.owners[0].images[276];
			var ownerName = data.project.owners["0"].display_name;
			var ownerAppreciations = data.project.owners["0"].stats.appreciations;
			var ownerViews = data.project.owners["0"].stats.views;
			var ownerFollowers = data.project.owners["0"].stats.followers;
			var ownerFollowing = data.project.owners["0"].stats.following;

            $("#projectTitle").empty().append(projectName);
            $("#projectImagesContainer").empty();
			$("#projectProfileImage").append("<img src='"+ownerImage+"' alt=''>")

			$("#sideBarInfoContainer").empty().append(
				`<div class="sideBarInfo">
					<div id="ownerName" class="sideBarHeader">${ownerName}</div>
				</div>
				<div class="sideBarInfo">
					<div id="ownerLikes" class="sideBarHeader"><i class='fa fa-heart' aria-hidden='true'></i>Appreciations</div>
					<div>${ownerAppreciations}</div>
				</div>
				<div class="sideBarInfo">
					<div id="ownerViews" class="sideBarHeader"><i class='fa fa-eye' aria-hidden='true'></i>Views</div>
					<div>${ownerViews}</div>
				</div>
				<div class="sideBarInfo">
					<div id="ownerFollowers" class="sideBarHeader"><i class='fa fa-users' aria-hidden='true'></i>Followers</div>
					<div>${ownerFollowers}</div>
				</div>
				<div class="sideBarInfo">
					<div id="ownerFollowing" class="sideBarHeader"><i class='fa fa-user-plus' aria-hidden='true'></i>Following</div>
					<div>${ownerFollowing}</div>
				</div>`
			);

			$("#projectStats").empty().append(
				"<div class='stat views'><i class='fa fa-eye' aria-hidden='true'></i>"+projectViews+"</div>"+
				"<div class='stat appreciations'><i class='fa fa-heart' aria-hidden='true'></i>"+projectLikes+"</div>"+
				"<div class='stat comments'><i class='fa fa-comment' aria-hidden='true'></i>"+projectComments+"</div>"
			);

			$("#behanceLink").empty().append(
				"<a href='"+projectUrl+"' target='_blank'>View on Behance</a><div class='linkHover'></div>"
			);

            for (var i = 0; i < data.project.modules.length; i++) {
                var imageUrl = data.project.modules[i].sizes[1400];
                $("#projectImagesContainer").append(
                    "<div class='projectImage'>"+
                        "<img src='"+imageUrl+"' alt=''>"+
                    "</div>"
                );

            }
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
		getProjectImages(behanceID);
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

scrollLoad("#serviceContent", 200, 1000);
scrollLoad("#teamContent", 800, 1000);
scrollLoad("#contactContent", 1200, 1000);

$("#logo").click(function(){
	scrollToTop();
	closeOverlays();
})

$("#overlayTest").click(function(){
	openProjectOverlay();
})

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

// Closes all overlays currently open and sets mainContainer back to normal
function closeOverlays(){
	$("#overlayProfile").fadeOut(400);
	$("#masterContainer").css("position","relative");
};

// Opens overlay for profile/projects
function openProjectOverlay(){
	$("#overlayProfile").css("display","flex");
	$("#overlayProfile").hide();
	$("#overlayProfile").fadeIn(700);
	$("#masterContainer").css("position","fixed");

};
