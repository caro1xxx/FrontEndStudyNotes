const { hasOwn } = require("@vue/shared");

因为vue变化侦测是使用object.defineProperty实现,
那么delete关键字删除属性,也就无法发现变化,$delete就是解决这个问题


** 不是必须使用$delete来删除属性,可以通过手动通知watcher的方法来实现 **

// 取巧的方法
delete this.obj.name;
// 在项目中手动通知依赖变化
this.obj.__ob__.dep.notify()


// 源码
Vue.prototype.$set = function (target,key){
  // 处理数组的情况
  if(Array.isArray(target) && isValidArrayIndex(key)){
    // 使用splice方法拦截器会自动发送依赖通知
    target.splice(key,1)
  }

  // 判断是否在根数据上,和$set一样不能在根数据上使用
  const ob = target.__ob__; // __ob__是个属性
  // _isVue:判断target是否是vue的实例
  if(target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production'  && warn('xxxxxxxxxxxxxxxxxx');
    // 这里return了空,因为是删除数据
    return 
  }

  // 如果key不是target自身的属性,则会终止程序继续执行
  if(!hasOwn(target,key)) {
    return 
  }

  delete target[key]

  // 判断target是否是一个响应式数据,如果不是,那么直接删除并且return退出不向依赖发送变化通知
  // 如果是那么就发送依赖变化通知
  if(!ob){
    return
  }

  ob.dep.notify();

}