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
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005
    });
})
