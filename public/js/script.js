var key = "3KmqsyCwcUQsMj4YVwuNodQ32jzvUyWx";
var userId;
var projectId;

// Get the usernames of the team to use for API calls.
$.get( "http://localhost:3000/behanceIDs", function(data) {
	for (var i = 0; i < data.length; i++) {
		var behanceID = data[i].behanceID;
		homepageProfileImage(behanceID);
	}
});

function homepageProfileImage(behanceID){
	$.ajax({
		url: "http://behance.net/v2/users/"+behanceID+"?api_key="+key+"&callback=myCallbackFunction",
		contentType: "application/json",
		dataType: "jsonp",
		success: function(data){
			var profileImage = data.user.images[276];
			var profileDisplayName = data.user.display_name;
			var profileId = data.user.id

			$("#teamContent").append(
					"<div class='teamProfileContainer'>"+
						"<div class='profileImage' data-type='"+profileId+"'>"+
							"<img src='"+profileImage+"' alt='profile image'>"+
						"</div>"+
						"<div class='teamMemberName'>"+profileDisplayName+"</div>"+
					"</div>"
				);
		},
		error: function(){
			console.log("Error retrieving profile picture");
		}
	});
};

// makes a call to the api and pulls profile info to display in the sidebar(profile picture, page views etc.)
function loadSideBarInfo(profileId){
	$.ajax({
		url: "http://behance.net/v2/users/"+profileId+"?api_key="+key+"&callback=myCallbackFunction",
		contentType: "application/json",
		dataType: "jsonp",
		success: function(data){
			console.log(data)

			var ownerImage = data.user.images[276];
			var ownerName = data.user.display_name;
			var ownerAppreciations = data.user.stats.appreciations;
			var ownerViews = data.user.stats.views;
			var ownerFollowers = data.user.stats.followers;
			var ownerFollowing = data.user.stats.following;

			$("#userProfileImage").empty().append("<img src='"+ownerImage+"' alt='Profile picture'>");

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
		},
		error: function(){
			console.log("Sidebar data not working");
		}
	});
}

// Loads all of the targets projects and displays them in a gallery format using the project "covers"
function loadProjectCovers(userId){
	$.ajax({
		url: "http://behance.net/v2/users/"+userId+"/projects?client_id="+key+"&callback=myCallbackFunction",
		contentType: "application/json",
		dataType: "jsonp",
		success: function(data){
			$("#projectGalleryOverlay").empty();
			for (var i = 0; i < data.projects.length; i++) {
				var projectId =	data.projects[i].id;
				var images = data.projects[i].covers[404];
				console.log(projectId);

				$("#projectGalleryOverlay").append(
					"<div class='coverImage projectGalleryImage' data-type='"+projectId+"'>"+
						"<img src='"+images+"' alt='project cover'>"+
					"</div>"
				);
			}
			// $("#projectGalleryOverlay").fadeIn(200);
			pageLoaded();
		},
		error: function(){
			console.log("Error with ajax request");
		}
	});
}

// Pulls a project from the api key and displays them in a pop up box
function loadProjectGallery(projectId){
	$.ajax({
		url: "http://www.behance.net/v2/projects/"+projectId+"?client_id="+key,
		contentType: "application/json",
		dataType: "jsonp",
		success: function(data){
			console.log("Project Load working");
			console.log(data);

			var projectName = data.project.name;
            var projectUrl = data.project.url;
			var projectLikes = data.project.stats.appreciations;
			var projectComments = data.project.stats.comments;
			var projectViews = data.project.stats.views;

			$("#projectTitle").empty().append(projectName);
            $("#projectImagesContainer").empty();
			$("#projectStats").empty().append(
				"<div class='stat views'><i class='fa fa-eye' aria-hidden='true'></i>"+projectViews+"</div>"+
				"<div class='stat appreciations'><i class='fa fa-heart' aria-hidden='true'></i>"+projectLikes+"</div>"+
				"<div class='stat comments'><i class='fa fa-comment' aria-hidden='true'></i>"+projectComments+"</div>"
			);
			$("#behanceLink").empty().append(
				"<a href='"+projectUrl+"' target='_blank'>View on Behance</a><div class='linkHover'></div>"
			);
            for (var i = 0; i < data.project.modules.length; i++) {
				var projectModule = data.project.modules[i];

				if (data.project.modules[i].type == "embed") {
					var embedVideo = data.project.modules[i].embed;
					$("#projectImagesContainer").append(
	                    "<div class='projectVideo'>"+
	                        embedVideo+
	                    "</div>"
	                );
				} else if(data.project.modules[i].type == "image"){
					var imageUrl = data.project.modules[i].sizes.original;
					$("#projectImagesContainer").append(
	                    "<div class='projectImage'>"+
	                        "<img src='"+imageUrl+"' alt='project image'>"+
	                    "</div>"
	                );
				} else if(data.project.modules[i].type == "text"){
					var projectText = data.project.modules[i].text_plain;
					$("#projectImagesContainer").append(
	                    "<div class='projectText'>"+
	                        projectText+
	                    "</div>"
	                );
				}
            }
			pageLoaded();
		},
		error: function(){
			console.log("Error loading project images");
		}
	});
}

function pageLoaded(){
	$("#loadPageOverlay").fadeOut(800);
}

$(document).on('click', '.profileImage', function(){
	var userId = $(this).attr('data-type');
	console.log("IM CLICKED");
	$("#loadPageOverlay").fadeIn(400, function() {
		$(this).css("display","flex");
		loadSideBarInfo(userId);
		openProjectOverlay();
		loadProjectCovers(userId);
	});
});

$(document).on('click', '.projectGalleryImage', function(){
	var projectIdAttr = $(this).attr('data-type');
	console.log(projectIdAttr);
	$("#loadPageOverlay").fadeIn(400, function() {
		$(this).css("display","flex");
		$("#popUpContainer").fadeIn(400);
		loadProjectGallery(projectIdAttr);
	});
});

$("#popUpToTop").click(function() {
	console.log("clicked bru");
    $('html, body, #projectContainer').animate({
        scrollTop: $("#projectTitle").offset().top
    }, 1800);
});

$("#closePopUp, #closePopUpIcon").click(function(){
	$("#popUpContainer").fadeOut(400);
	$("#projectImagesContainer").empty();
	pageLoaded();
});

$("#popUpHome").click(function(){
	$("#loadPageOverlay").fadeIn(200, function() {
		$(this).css("display","flex");
		$("#popUpContainer").fadeOut(400)
		$("#projectImagesContainer").empty(500);
		closeOverlays();
		pageLoaded();
	});
});

$('body').keydown(function(event){
  if ( event.which == 27 ) {
		event.preventDefault();
		$("#popUpContainer").fadeOut(400);
		pageLoaded();
  }
})

$(document).ready(function(){
    $(this).scrollTop(0);
});

$("#hamburgerMenu").click(function(){
	$("#overlayMenu").fadeIn(300);
	$("body").css('overflow','hidden');
});

$("#closeMenu").click(function(){
	$("#overlayMenu").fadeOut(300);
	$("body").css('overflow','auto');
});

$("#landingPageContainer").fadeIn(600);

scrollLoad("#teamContent", 800, 1000);
scrollLoad("#contactContent", 1200, 1000);

$("#logo, #profileBackButton, .backToTop, #popUpHome").click(function(){
	scrollToTop();
	closeOverlays();
});

// Function which loads elements on scroll.
function scrollLoad(element, value, timer){
	$(window).bind('scroll', function () {
	    if ($(window).scrollTop() > value) {
	        $(element).fadeIn(timer);
	    }
	});
}

scrollLoadImages("#homepageImageContainer", 500);

function scrollLoadImages(element, value){
	$(window).bind('scroll', function () {
	    if ($(window).scrollTop() > value) {
	        $(element).css("opacity","1");
	    }
	});
}

/*Scrolls to top*/
function scrollToTop(){
	$('html, body').animate({scrollTop: 0}, 600);
}

// Closes all overlays currently open and sets mainContainer back to normal
function closeOverlays(){
	$("#overlayProfile").fadeOut(500);
	$("#masterContainer").css("position","relative");
	$("footer").css("position","relative");
};

// Opens overlay for profile/projects
function openProjectOverlay(){
	$("#overlayProfile").css("display","flex");
	$("#overlayProfile").hide();
	$("#overlayProfile").fadeIn(700);
	$("#masterContainer").css("position","fixed");
	$("footer").css("position","fixed");
};
