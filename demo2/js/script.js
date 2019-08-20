window.onload=function(){
var  timer = null,
     banner = byId("banner"),
     bannerImages = banner.getElementsByTagName("a"),
     size = bannerImages.length,
     mainTop = byId("main-top").getElementsByTagName("a"),
     lis =byId("main-top").getElementsByTagName("li"),
     index = 0;

//点击标题切换相应的图片背景变色
for(var j=0;j<size;j++){
    mainTop[j].id=j;
    addHandler(mainTop[j],"click",function(){
        index = this.id;
        changeImg();
    })
}





//封装创建绑定事件兼容IE
function addHandler(element,type,handler){
    if(element.addEventListener){
        element.addEventListener(type, handler,true);
    }else if(element.attachEvent){
        element.attachEvent("on"+type,handler);
    }else{
        element["on"+type] = handler;
    }

}


//封装document.getElemetnById('');
function byId(id){
   return typeof(id) === "string" ? document.getElementById(id):id;
}

//自动轮播图片
function startAutoPlay(){
    time=setInterval(function(){
        index++;
        if (index>=size){ index=0};
        changeImg();
    },1000);

}

function changeImg(){
    for(var i=0;i<size;i++){
        lis[i].style.background="none";
        bannerImages[i].style.display="none";
    }
    bannerImages[index].style.display="block";
    lis[index].style.background="#ffcc00";
}

startAutoPlay();//点开网页开始轮播

//鼠标进入banner区域，停止轮播

addHandler(banner,"mousemove",function(){
    clearInterval(time);
})
//鼠标离开banner区域，开始轮播
addHandler(banner,"mouseout",function(){
    startAutoPlay();
})

}