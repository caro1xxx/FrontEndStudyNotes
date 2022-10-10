1.提炼函数:
  1.如果一个函数过长,不得不加上若干注释才能让这个函数显得易读一些,那这些函数就很有必要进行重构
  2.如果在函数中有一段代码可以被独立出来,那我们最好把这些代码放进另外一个独立的函数中
        避免出现超大函数
        独立出来的函数有助于代码复用
        独立出来的函数更容易被覆写
        独立出来的函数如果拥有一个良好的命名,它本身就起到了注释的作用
2.合并重复的条件片段:
  如果一个函数体内有一些条件分支语句,而这些条件分支语句内部散布了一些重复的代码,那么就有必要进行合并去重工作
3.把条件分支语句提炼成函数:
  在程序设计中,复杂的条件分支语句是导致程序难以阅读和理解的重要原因,而且容易导致一个庞大的函数
4.合理使用循环:
  在函数体内,如果有些代码实际上负责的是一些重复性的工作,那么合理利用循环不仅可以完成同样的功能,还可以使代码量更少
  例子创建一个xhr:
  var createXHR = function(){  
      var xhr;                                                                                      
      try{ 
          xhr = new ActiveXObject( 'MSXML2.XMLHttp.6.0' ); 
      }catch(e){ 
          try{                                                                                           
              xhr = new ActiveXObject( 'MSXML2.XMLHttp.3.0' ); 
          }catch(e){ 
              xhr = new ActiveXObject( 'MSXML2.XMLHttp' ); 
          }  
      } 
      return xhr; 
  };
  var xhr = createXHR(); 
  改写:
  var createXHR = function(){ 
    //
  var versions= [ 'MSXML2.XMLHttp.6.0ddd', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp' ]; 
    //
      for ( var i = 0, version; version = versions[ i++ ]; ){ 
          try{ 
              return new ActiveXObject( version );                                            
          }catch(e){ 
          } 
      }                                                                                       
  };
  var xhr = createXHR()
5.提前让函数退出代替嵌套条件分支:
  例子:
  let a = 1;
  let b = 1;
  function (){
    if(a == 1){
      if(b == 1){
        // 详细代码
      }
    }
  }
  改写:
  function (){
    if(a != 1)return;
    if(b != 1)return;
    // 详细代码
  }
6.传递对象参数代替过长的参数列表:
  当参数过多时我们应该选择装在对象内,通过传递对象,然后属性读取
7.尽量减少参数数量:
8.少用三目运算符:
9.合理使用链式调用:
  如果该链条的结构相对稳定,后期不易发生修改,那么使用链式调用无可厚非.但如果该链
  条很容易发生变化,导致调试和维护困难,那么还是建议使用普通调用的形式
10.分解大型类:
11.用return退出多重循环: