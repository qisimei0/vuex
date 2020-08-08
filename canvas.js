let canEle=document.getElementById('canvas');
let ctx=canEle.getContext('2d');
canEle.width=800;
canEle.height=340;
let texts=[
  '这个演员演得好烂',
  '有鬼吧',
  '编剧脑子有坑',
  '男主真水',
  '女主傻吧',
  '一看就是二货',
  '茶几可爱'
];
// 发送弹幕
function send(){
  // 获取弹幕文本对象
  let textEle=document.getElementById('text');
  // 获取弹幕文本对象的值
  let textVal=textEle.value;
  // 获取
  let sizeEle=document.getElementById('size');
  let sizeVal=sizeEle.value;
  let colorEle=document.getElementById('color');
  let colorVal=colorEle.value;
  let speedEle=document.getElementById('speed');
  let speedVal=speedEle.value;
  /*************将获取的数据填充到Barrage对象中**********/
  let barrage=new Barrage(textVal,sizeVal,colorVal,speedVal);
  /*************将填充后Barrage对象填充到数组中**********/
  barrages.push(barrage);

}
// 弹幕类
class Barrage{
  constructor (text,size,color,speed){
    // this指向实例化对象
    this.text=text;
    this.x=canEle.width;
    this.y=Math.ceil(Math.random()*(canEle.height-40))+20;
    this.color=color;
    this.font=size +' Microsoft Yahei';
    this.speed=speed;
  }
}
let barrages=[];
function init(){
  for(let n=0;n<texts.length;n++){
    let barrage=new Barrage(texts[n],'16px','#f0f',1);
    barrages.push(barrage);
    // 修改文本颜色
    ctx.fillStyle=barrage.color;
    // 修改文本字体样式
    ctx.font=barrage.font;
    // 绘制文
    
    ctx.fillText(barrage.text,barrage.x,barrage.y);
  }
  console.log(barrages);
}
function animation(){
  ctx.clearRect(0,0,canEle.width,canEle.height);
  for(let n=0;n<barrages.length;n++){
    // 每一个弹幕文本对象
  let barrage=barrages[n];
  ctx.fillStyle=barrage.color;
  ctx.font=barrage.font;
    // 弹幕文本对象的x轴在上一个x轴位置的基础方向左移
    barrage.x-=barrage.speed;
    // 绘制文本
    ctx.fillText(barrage.text,barrage.x,barrage.y);
  }
  // 循环绘制动画帧
  window.requestAnimationFrame(animation);
}
init();
animation();
