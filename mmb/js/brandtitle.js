$(function() {

	$.ajax({
		url: "http://localhost:9090/api/getbrandtitle",
		success: function(data) {
			console.log(data);
			var result = data.result;
			var tv = '';
			var vrv = '';
			var video = '';
			var refrigerator = '';
			var kitchen = '';
			var mobile = '';
			var camera = '';
			for (var i=0; i<result.length; i++) {
				if(result[i].brandTitle.indexOf('电视') !=-1){
					console.log(result[i].brandTitle);
					console.log(' + result[i].brandTitleId + ');
//					$('.tv').html('<p><a href="' + result[i].brandTitleId + '">' + result[i].brandTitle + '</a></p>');
					tv += ('<p><a href="brand-content.html?brandtitleid='+ result[i].brandTitleId + ' ">' + result[i].brandTitle + '</a></p>');
					$('.tv').html(tv);
				} else if(result[i].brandTitle.indexOf('空调') !=-1) {
					vrv += ('<p><a href="brand-content.html?brandtitleid='+ result[i].brandTitleId + ' ">' + result[i].brandTitle + '</a></p>');
					$('.vrv').html(vrv);
				} else if(result[i].brandTitle.indexOf('影院') !=-1) {
					video += ('<p><a href="brand-content.html?brandtitleid='+ result[i].brandTitleId + ' ">' + result[i].brandTitle + '</a></p>');
					$('.video').html(video);
				} else if(result[i].brandTitle.indexOf('播放器') !=-1) {
					video += ('<p><a href="brand-content.html?brandtitleid='+ result[i].brandTitleId + ' ">' + result[i].brandTitle + '</a></p>');
					$('.video').html(video);
				} else if(result[i].brandTitle.indexOf('冰箱') !=-1) {
					refrigerator += ('<p><a href="brand-content.html?brandtitleid='+ result[i].brandTitleId + ' ">' + result[i].brandTitle + '</a></p>');
					$('.refrigerator').html(refrigerator);
				} else if(result[i].brandTitle.indexOf('洗衣机') !=-1) {
					kitchen += ('<p><a href="brand-content.html?brandtitleid='+ result[i].brandTitleId + ' ">' + result[i].brandTitle + '</a></p>');
					$('.kitchen').html(kitchen);
				} else if(result[i].brandTitle.indexOf('热水') !=-1) {
					kitchen += ('<p><a href="brand-content.html?brandtitleid='+ result[i].brandTitleId + ' ">' + result[i].brandTitle + '</a></p>');
					$('.kitchen').html(kitchen);
				} else if(result[i].brandTitle.indexOf('手机') !=-1) {
					mobile += ('<p><a href="brand-content.html?brandtitleid='+ result[i].brandTitleId + ' ">' + result[i].brandTitle + '</a></p>');
					$('.mobile').html(mobile);
				} else if(result[i].brandTitle.indexOf('相机') !=-1) {
					camera += ('<p><a href="brand-content.html?brandtitleid='+ result[i].brandTitleId + ' ">' + result[i].brandTitle + '</a></p>');
					$('.camera').html(camera);
				}
			}
		}
	});
	
	//获取区域滚动的父容器 调用初始化区域滚动插件的函数
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    
})
