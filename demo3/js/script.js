// 声明全局变量
var index = 0,      //当前图片索引
    main = byId('main'),
    timer = null,//定时器
    prev = byId("prev"),//上一张
    next = byId("next"),//下一张
    banner = byId("banner").getElementsByTagName("div"),
    banners = byId("banner"),
    size = banner.length,
    subMenu = byId('sub-menu'),
    innerBox = subMenu.getElementsByClassName("inner-box"),
    menuContent = byId("menu-content"),
    menuItems = byId("menu-content").getElementsByTagName("div"),
    dots = byId("dots").getElementsByTagName("span");
// 封装getElementById()
function byId(id){
 return typeof(id) === "string" ? document.getElementById(id) : id;
}
//封装通用事件绑定方法
function addHandler(element,type,handler){
    if(element.addEventListener){
       element.addEventListener(type,handler,true);
    }else if(element.attachEvent){
       element.attachEvent("on"+type,handler);
    }else{
        element['on'+type] = handler;
    }
}
//清除定时器，停止自动轮播
function stopAutoPlay(){
      if(timer){
        clearInterval(timer);
      }
}
// 自动播放
function starAutoPlay(){
    timer = setInterval(function(){
        index++;
        if(index>=size) index=0;
        changimg();
    },3000);

}

function changimg(){
    for(var i=0;i<size;i++){
        banner[i].style.display="none";
        dots[i].className="";
    }
    banner[index].style.display="block";
    dots[index].className="active";

}

//点击下一张按钮显示下一张图片
addHandler(next,"click",function(){
    index++;
    if(index>=size) index=0;
    changimg();
});
//点击上一张按钮显示上一张图片
addHandler(prev,"click",function(){
    index--;
    if(index<0) index=size-1;
    changimg();
});

//点击圆点索引切换图片
for(var d=0;d<size;d++){
    dots[d].setAttribute('data-id',d);
    addHandler(dots[d],'click',function(){
        index = this.getAttribute('data-id');
        changimg();
    })
}
//鼠标滑过主菜单
for(var m = 0,idx,mlen = menuItems.length; m<mlen; m++){
    menuItems[m].setAttribute('data-index',m);
    addHandler(menuItems[m],"mousemove",function(){
    subMenu.className="sub-menu";
    idx=this.getAttribute("data-index");
    for(var j=0 ,jlen=innerBox.length;j<jlen;j++){
        innerBox[j].style.display="none";
        menuItems[j].style.background="none";
    }
    innerBox[idx].style.display='block';
    menuItems[idx].style.background="rgba(0,0,0,0.1)"
    })
}
addHandler(banners,"mouseout",function(){
    subMenu.className="sub-menu hide";
})

addHandler(menuContent,"mouseout",function(){
    subMenu.className="sub-menu hide";
})
addHandler(subMenu,"mouseover",function(){
    this.className="sub-menu";
})
addHandler(subMenu,"mouseout",function(){
    this.className="sub-menu hide";
})
//鼠标滑入main，停止轮播
addHandler(main,"mousemove",stopAutoPlay);
//鼠标离开main,自动开启轮播
addHandler(main,"mouseout",starAutoPlay);
// 开启自动播放
starAutoPlay();