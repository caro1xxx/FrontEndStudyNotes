/* 
  因为let space = obj;
  space得到了obj的引用
  如果后续space发生变化,obj也会随之变化
*/
let obj = {}
obj.nameSpace = function (name){
  let space = obj;
  let spaceSplit=  name.split('.');
  for(let i in spaceSplit){
    if(!space[spaceSplit[i]]){
      space[spaceSplit[i]] ={};
    }
    space = space[spaceSplit[i]];
  }
}

obj.nameSpace('event.dom')