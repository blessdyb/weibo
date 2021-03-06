jQuery(document).ready(function($){ 
		
        weibo.getAccountInfo();
        weibo.getFriendsTimeline();
        weibo.getMentions();
        weibo.getCommentsByMe();
        weibo.getCommentsToMe();
        weibo.getUserTimeline();
        weibo.getFollowers();
        weibo.getFriends();
        
	$("aside a").click(function(){
		$("aside a").removeClass("active");
		$(this).addClass("active");
		$("aside li").removeClass("active");
		$(this).parent().addClass("active");
	});
	$("nav a.tabs_link").click(function(){
				$("nav a.tabs_link").removeClass("active");
				$(this).addClass("active");
			});
	$("nav a.all_group").click(function(){
		$("nav a.tabs_link").removeClass("active");
		$(this).toggleClass("active");
		$("#allgroup").toggle();
	});
	
	$(".filter_all").click(function(){
		$("#home .content").hide();
		$("#home #allmain").show();
	});
	$(".filter_pics").click(function(){
		$("#home .content").hide();
		$("#home #filter_pics").show();
	});
	$(".filter_original").click(function(){
		$("#home .content").hide();
		$("#home #filter_original").show();
	});
	$(".filter_videos").click(function(){
		$("#home .content").hide();
		$("#home #filter_videos").show();
	});
	$(".filter_musics").click(function(){
		$("#home .content").hide();
		$("#home #filter_musics").show();
	});
	
	
	
	$("#allgroup a").click(function(){
		$("#allgroup a").removeClass("active");
		$(this).addClass("active");
	});
	
	$("#desktopTopic").hide();
	$("#wrap").click(function(){
		$("#desktopTopic").hide();
	});

	$(".desktop").click(function(event){
		event.stopPropagation();
		$("#desktopTopic").show();
		$('.sliderGallery').jScrollPane();
	});
	$(".topic_default").click(function(){

		$("body").css("background-image","url(images/wallpaper_default.png)");
	});
	$(".topic_fish").click(function(){
		$("body").css("background-image","url(images/wallpaper_fish.png)");
	});
	$(".topic_flower").click(function(){
		$("body").css("background-image","url(images/wallpaper_flower.png)");
	});
	$(".topic_darkGreen").click(function(){
		$("body").css("background-image","url(images/wallpaper_darkGreen.png)");
	});
	$(".topic_grey").click(function(){
		$("body").css("background-image","url(images/wallpaper_grey.png)");
	});
	$('.scroll_pane').jScrollPane(
		{
			showArrows: true, 

			hijackInternalLinks: true,
			verticalDragMinHeight: 20,
			verticalDragMaxHeight: 20,
			horizontalDragMinWidth: 20,
			horizontalDragMaxWidth: 20
		}
	);
	
	
	$(".user_home").live('click',function(){
		$("#moreMain").show();
		$("#moreMain > section").hide();
		$("#moreMain #userMaterial").show();
		$("article").removeClass("hover");
		$(this).parent().parent().addClass("hover");
		$("article .turn_box").removeClass("hover");
		$("#picShowr").hide();
		$('.user_blog').jScrollPane(
			{
				hijackInternalLinks: true,
				verticalDragMinHeight: 20,
				verticalDragMaxHeight: 20,
				horizontalDragMinWidth: 20,
				horizontalDragMaxWidth: 20
			}
		);
		$(".jspPane").css("left","0px");
		weibo.getUserInfo($(this).find(".user_id").val());
	});
	$("article .main").live('click',function(){
		$("#moreMain").show();
		$("#moreMain > section").hide();
		$("#moreMain #blogShow").show();
		$("article").removeClass("hover");
		$(this).parent().addClass("hover");
		$("article .turn_box").removeClass("hover");
		$("#picShowr").hide();
		$('.artivle_scroll').jScrollPane(
			{
				hijackInternalLinks: true,
				verticalDragMinHeight: 20,
				verticalDragMaxHeight: 20,
				horizontalDragMinWidth: 20,
				horizontalDragMaxWidth: 20
			}
		);
		$(".jspPane").css("left","0px");
		weibo.getWeiboComments($(this).find(".weibo_id").val());
	});
	
	$("article section .text_box").live('click',function(){
		$("#moreMain").show();
		$("#moreMain > section").hide();
		$("#moreMain #blogShow").show();
		$("article").removeClass("hover");
		$("article .turn_box").removeClass("hover");
		$(this).parent().addClass("hover");
		$("#picShowr").hide();
		weibo.getWeiboComments($(this).find(".weibo_id").val());
	});
	$("#moreMain a.close").live('click',function(){
		$("#moreMain").hide();
	});
	
	$(".user_info a").live('click',function(){
		$(".user_info li").removeClass("hover");
		$(this).parent().addClass("hover");
	});
	$("article .img_box").live('click',function(){
		$("#moreMain").hide();
		var bodywidth = $("body").width();
		if(bodywidth == 768){
			$("#picShowr").hide();
			$("#picShow").show();
		}else{
		$("#picShowr").show();		
	  }
	});
	$("#picShowr img").live('click',function(){
		$("#picShow").show();
	});
	$("#userMaterial .img_box").click(function(){
		$("#picShow").show();
	});
	$("#picShow").live('click',function(){
		$(this).hide();
	});
	// var imgh = $("#picShow img").height();
	// 	var newimgh = imgh/2
	// 	alert(newimgh);
	// 	$("#picShow img").css({"margin-top":"-130px"});
	
	$("aside .info").live('click',function(){
		$("#main").children().hide();
		$("#main #info").show();
		$("#moreMain").hide();
		$("#picShowr").hide();
		$('.scroll_pane').jScrollPane(
			{
				showArrows: true, 

				hijackInternalLinks: true,
				verticalDragMinHeight: 20,
				verticalDragMaxHeight: 20,
				horizontalDragMinWidth: 20,
				horizontalDragMaxWidth: 20
			}
		);
		$(".jspPane").css("left","0px");
	});
	$("aside .topic").live('click',function(){
		$("#main").children().hide();
		$("#main #topic").show();
		$("#main .topic_hot").addClass("active");
		$("#moreMain").hide();
		$("#picShowr").hide();
		$('.scroll_pane').jScrollPane(
			{
				showArrows: true, 

				hijackInternalLinks: true,
				verticalDragMinHeight: 20,
				verticalDragMaxHeight: 20,
				horizontalDragMinWidth: 20,
				horizontalDragMaxWidth: 20
			}
		);
		$(".jspPane").css("left","0px");
	});
	$("aside .home").live('click',function(){
		$("#main").children().hide();
		$("#main #home").show();
		$("#moreMain").hide();
		$("#picShowr").hide();
		$('.scroll_pane').jScrollPane(
			{
				showArrows: true, 

				hijackInternalLinks: true,
				verticalDragMinHeight: 20,
				verticalDragMaxHeight: 20,
				horizontalDragMinWidth: 20,
				horizontalDragMaxWidth: 20
			}
		);
		$(".jspPane").css("left","0px");
	});
	$("aside .atme").live('click',function(){
		$("#main").children().hide();
		$("#main #atme").show();
		$("#moreMain").hide();
		$("#picShowr").hide();
		$('.scroll_pane').jScrollPane(
			{
				showArrows: true, 

				hijackInternalLinks: true,
				verticalDragMinHeight: 20,
				verticalDragMaxHeight: 20,
				horizontalDragMinWidth: 20,
				horizontalDragMaxWidth: 20
			}
		);
		$(".jspPane").css("left","0px");
	});
	$("aside .comment").live('click',function(){
		$("#main").children().hide();
		$("#main #comment").show();
		$("#moreMain").hide();
		$("#picShowr").hide();
		$('.scroll_pane').jScrollPane(
			{
				showArrows: true, 

				hijackInternalLinks: true,
				verticalDragMinHeight: 20,
				verticalDragMaxHeight: 20,
				horizontalDragMinWidth: 20,
				horizontalDragMaxWidth: 20
			}
		);
		$(".jspPane").css("left","0px");
	});
	$("aside .message").live('click',function(){
		$("#main").children().hide();
		$("#main #message").show();
		$("#moreMain").hide();
		$("#picShowr").hide();
		$('.scroll_pane').jScrollPane(
			{
				showArrows: true, 

				hijackInternalLinks: true,
				verticalDragMinHeight: 20,
				verticalDragMaxHeight: 20,
				horizontalDragMinWidth: 20,
				horizontalDragMaxWidth: 20
			}
		);
		$(".jspPane").css("left","0px");
	});
	
	$(".compose").live('click',function(){
		$("#compose").show();
	});
	$("#compose_box .close").live('click',function(){
		$("#compose").hide();
	});
	$("a.button_unselected").live('click',function(){
		$("a.button_unselected").removeClass("active");
		$(this).addClass("active");
	});
	$(".searchBar input.text").live('click',function(){
		$(".searchBar").addClass("cur");
	});
	
	$(".albums").live('click',function(){
		$("#pics").show();
		$('.scroll_pane').jScrollPane(
			{
				showArrows: true, 

				hijackInternalLinks: true,
				verticalDragMinHeight: 20,
				verticalDragMaxHeight: 20,
				horizontalDragMinWidth: 20,
				horizontalDragMaxWidth: 20
			}
		);
		$(".jspPane").css("left","0px");
	});
	//pics
	$("#pics .closeButton").live('click',function(){
		$("#pics").hide();
	});
	$("#pics .pics_box").live('click',function(){
		$("#picsshow").show();
	});
	$("#picsshow").live('click',function(){
		$(this).hide();
	});
	//info
	$(".info_wb").live('click',function(){
		$("#info .content").hide();
		$("#info_wb").show();
	});
	$(".info_sc").live('click',function(){
		$("#info .content").hide();
		$("#info_sc").show();
	});
	$(".info_gz").live('click',function(){
		$("#info .content").hide();
		$("#info_gz").show();
	});
	$(".info_fs").live('click',function(){
		$("#info .content").hide();
		$("#info_fs").show();
	});
	//comment
	$(".comment_receive").live('click',function(){
		$("#comment .content").hide();
		$("#comment #comment_receive").show();
	});
	$(".comment_issued").live('click',function(){
		$("#comment .content").hide();
		$("#comment #comment_issued").show();
	});
	//topic
	$(".topic_hot").live('click',function(){
		$("#topic .content").hide();
		$("#topic #topic_hot").show();
	});
	$(".topic_follow").live('click',function(){
		$("#topic .content").hide();
		$("#topic #topic_follow").show();
	});
	

	
});
