$(function(){
    setNowFontSize();

    function setNowFontSize() {
      
        var StandardWidth = 375;
        var StandardFontSize = 100;
        var maxFontSize = 200;
        var nowWidth = document.documentElement.offsetWidth;
        var nowFontSize = nowWidth / StandardWidth * StandardFontSize;
        console.log(nowWidth);
        console.log(nowFontSize);
    
        if(nowFontSize > maxFontSize){
            nowFontSize = maxFontSize;
        }
        document.documentElement.style.fontSize = nowFontSize + 'px';
    }
    window.addEventListener('resize', setNowFontSize);
    
})