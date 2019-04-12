////////////入口/////////////
           main();          
////////////////////////////

function main(){
  init();
  score = document.getElementById('score');
  page = document.body;
  //给按钮绑定单击事件
  {
    var btn = document.getElementById('btn');
    btn.onclick = init;
  }
  //监听鼠标事件
  {
    page.addEventListener("mousedown",mousehandler,true);
  }
  //监听键盘事件
  {
    page.addEventListener("keyup",Keyboardhandler,true);
  }
}
//鼠标处理事件
function mousehandler(event){
  event = event || window.event;
  var originX = event.clientX;
  var originY = event.clientY;
  var direction = 0;
  //获取方向
  page.onmouseup = function(event){
    event = event || window.event;
    var curX = event.clientX;
    var curY = event.clientY;
    var x = curX-originX;
    var y = curY-originY;
    var arc = Math.atan(y/x);
    // 判断方向
    if( x>0 &&  ( arc >= -Math.PI/4 && arc <= Math.PI/4)){
      direction = 1;
    }else if( x<0 && ( arc >= -Math.PI/4 && arc <= Math.PI/4)){
      direction = -1;
    }else if( y>0 && ( ( arc >= Math.PI/4 && arc <= Math.PI/2 )||( arc>=-Math.PI/2 && arc<-Math.PI/4 ) )){
      direction = 2;
    }else if( y<0 && ( ( arc >= Math.PI/4 && arc <= Math.PI/2 )||( arc>=-Math.PI/2 && arc<-Math.PI/4 ) )){
      direction = -2;
    }
    operation(direction);
  };
}
//键盘处理事件
function Keyboardhandler(event){
      event = event || window.event;
      var keynum;
      var direction = 0;
      if(event.keyCode){
        keynum = event.keyCode;
      }else if(event.which){
        keynum = event.which;
      }
      if(keynum == 39 || keynum == 68){
        direction = 1;
      }else if(keynum == 37 || keynum == 65){
        direction = -1;
      }else if(keynum == 40 || keynum == 83){
        direction = 2;
      }else if(keynum == 38 || keynum == 87){
        direction = -2;
      }
      operation(direction);
    }
//处理事件
function operation(direction){
  switch (direction){//1 右 -1 左 2 下 -2 上
    case -2:up();
      break;
    case -1:left();
      break;
    case 0: break;
    case 1:right();
      break;
    case 2:down();
      break; 
  }
  if(direction){
    var rest = [];
    for(var i=0;i<4;++i)
      for(var j=0;j<4;++j){
        var str="coordinate-"+i+"-"+j;
        if(document.getElementById(str).textContent == ""){
          rest[rest.length]= document.getElementById(str);
        }
      }
    if(rest.length >=2 ){
      var r1 = parseInt(Math.random()*rest.length);
      var r2 = parseInt(Math.random()*rest.length);
      while(r2==r1){
        r2 = parseInt(Math.random()*rest.length);
      }
      var a = 2 + 2 * parseInt(Math.random()*2);
      var b = 2 + 2 * parseInt(Math.random()*2);
      rest[r1].innerHTML = a;
      rest[r1].className += " lattice-"+a;
      rest[r2].innerHTML = b;
      rest[r2].className += " lattice-"+b;
    }else if(rest.length == 1){
      var r = parseInt(Math.random()*rest.length);
      var a = 2 + 2 * parseInt(Math.random()*2);
      rest[r].innerHTML = a;
      rest[r].className += " lattice-"+a;
    }else{
      var flag = 0;
      for(var i=0;i<4;++i){
        for(var j=0;j<4;++j){
          var str="coordinate-"+i+"-"+j;
          var block = document.getElementById(str);
          //跟上下左右元素比较，有相同的说明游戏还没结束
          if(i>0){
            var str2="coordinate-"+(i-1)+"-"+j;
            var block2 = document.getElementById(str2);
            if(block.textContent == block2.textContent){
              flag = 1;
              break;
            }
          }
          if(j<3){
            var str2="coordinate-"+i+"-"+(j+1);
            var block2 = document.getElementById(str2);
            if(block.textContent == block2.textContent){
              flag = 1;
              break;
            }
          }
          if(i<3){
            var str2="coordinate-"+(i+1)+"-"+j;
            var block2 = document.getElementById(str2);
            if(block.textContent == block2.textContent){
              flag = 1;
              break;
            }
          }
          if(j>0){
            var str2="coordinate-"+i+"-"+(j-1);
            var block2 = document.getElementById(str2);
            if(block.textContent == block2.textContent){
              flag = 1;
              break;
            }
          }
        }
        if(flag){
          break;
        }
      }
      if(!flag){
        alert('Game Over! 本局得分为'+score.textContent);
        init();
      }
    }
  }  
}

function change(arr){
  for(var m=0;m<arr.length;++m){
    var n;
    for(n=m+1;n<arr.length;++n){
      if(arr[n].textContent != ""){
        break;
      }
    }
    if(n>=arr.length){
      continue;
    }
    if(arr[m].textContent == ""){
      arr[m].textContent = arr[n].textContent;
      arr[n].textContent = "";
      --m;
    }
    else if(arr[m].textContent == arr[n].textContent){
      arr[m].textContent = Number(arr[n].textContent)*2;
      score.innerHTML = Number(score.textContent) + Number(arr[n].textContent)
      arr[n].textContent = "";
    }
  }
  for(var k=0;k<arr.length;++k){
    if(arr[k].textContent == ""){
      arr[k].className = "lattice";
    }else{
      arr[k].className = "lattice lattice-"+arr[k].textContent;
    }
  }
}
//向右
function right(){
  for(var i=0;i<4;++i){
    var arr = [];
    for(var j=3;j>=0;--j){
      var str="coordinate-"+i+"-"+j;
      arr[arr.length] = document.getElementById(str);
    }
    change(arr);
  }  
}
//向左
function left(){
  for(var i=0;i<4;++i){
    var arr = [];
    for(var j=0;j<4;++j){
      var str="coordinate-"+i+"-"+j;
      arr[arr.length] = document.getElementById(str);
    }
    change(arr);
  }  
}
//向下
function down(){
  for(var i=0;i<4;++i){
    var arr = [];
    for(var j=3;j>=0;--j){
      var str="coordinate-"+j+"-"+i;
      arr[arr.length] = document.getElementById(str);
    }
    change(arr);
  }  
}
//向上
function up(){
  for(var i=0;i<4;++i){
    var arr = [];
    for(var j=0;j<4;++j){
      var str="coordinate-"+j+"-"+i;
      arr[arr.length] = document.getElementById(str);
    }
    change(arr);
  }  
}
//初始化
function init(){
  //清空
  var score = document.getElementById('score');
  score.innerHTML = 0;
  for(var i=0;i<4;++i)
    for(var j=0;j<4;++j){
      var str="coordinate-"+i+"-"+j;
      var block = document.getElementById(str);
      block.innerHTML = "";
      block.className = "lattice";
    }
  //生成两个随机数 2 4 之间选择
  var a = 2 + 2 * parseInt(Math.random()*2);
  var b = 2 + 2 * parseInt(Math.random()*2);
//         console.log("a="+a);
//         console.log("b="+b);
  //生成两对随机坐标
  var x1 = parseInt(Math.random()*4);
  var y1 = parseInt(Math.random()*4);
  var x2 = parseInt(Math.random()*4);
  var y2 = parseInt(Math.random()*4);
  while(x1 == x2 && y1 == y2){
    x2 = parseInt(Math.random()*4);
    y2 = parseInt(Math.random()*4);
  }
//         console.log("x1="+x1+" y1="+y1);
//         console.log("x2="+x2+" y2="+y2);
  {
    var str="coordinate-"+x1+"-"+y1;
    // console.log(str);
    var block = document.getElementById(str);
    // console.log(block);
    block.innerHTML = a;
    block.className += " lattice-"+a;
    
    str="coordinate-"+x2+"-"+y2;
    // console.log(str);
    block = document.getElementById(str);
    // console.log(block);
    block.innerHTML = b;
    block.className += " lattice-"+b;
  }
}