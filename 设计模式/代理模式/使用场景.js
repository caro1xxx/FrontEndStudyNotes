/* 
    在 Web 开发中，图片预加载是一种常用的技术，如果直接给某个 img 标签节点设置 src属性， 
  由于图片过大或者网络不佳，图片的位置往往有段时间会是一片空白。常见的做法是先用一张 
  loading 图片占位，然后用异步的方式加载图片，等图片加载好了再把它填充到 img 节点里，这种 
  场景就很适合使用虚拟代理
*/
/* 
  我们可以使用代理,在图片还未完全加载完毕时,使用代理给元素img添加上一点东西,提示用户图片正在加载中
  等待图片加载完毕后,代理对象把真正的图片替换到元素img
*/
/* 
  简单实现
*/
var myImage = (function(){ 
  var imgNode = document.createElement( 'img' ); 
  document.body.appendChild( imgNode ); 
  return { 
      setSrc: function( src ){ 
          imgNode.src = src;         
      }  
  } 
})(); 

var proxyImage = (function(){ 
  var img = new Image; 
  // 监听真实图片的加载进度,一旦加载完毕便替换loading.gif
  img.onload = function(){ 
      myImage.setSrc( this.src ); 
  } 
  return { 
    // 在真实图片未加载完时,使用loading.gif代替
      setSrc: function( src ){ 
          myImage.setSrc( 'file:loading.gif' ); 
          img.src = src;         
      } 
  } 
})(); 

proxyImage.setSrc( 'http:// imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg' );