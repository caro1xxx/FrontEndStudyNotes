用法:在object上设置一个属性,如果object是响应式的,
vue会保证属性被创建后也是响应式的,并且触发视图更新,
这个方法主要用于避开vue2不能侦测属性被添加后的限制

所有带$的方法其实都是Vue实例身上的方法


Vueg规定需要有这是三个参数
  target:目标对象
  key:需要构成响应式对象的key
  val:需要构成响应式对象的value
Vue.prototype.$set = function (target,key,val) {
  // 处理target是数组的情况
  // isValidArrayIndex:判断是否是有效下标
  if(Array.isArray(target) && isValidArrayIndex(key)) {
    // 如果传的下标大于当前数组长度,那么让target长度等于下标
    target.length = Math.max(target.length,key);
    // 插入
    // 使用splice方法拦截器会自动发送依赖通知
    target.splice(key,1,val);
    return val;
  }

  // key存在于target中的情况
  // key存在target中只需要对value进行更新,修改数据的动作会被vue侦测到,并自动向依赖发送通知
  if(key in target && !(key in Object.prototype)){
    target[key] = val;
    return val
  }

  // 新增属性的情况
  const ob = target.__ob__; // __ob__是个属性
  // _isVue:判断target是否是vue的实例
  // ob.vmCount:判断它是否是根数据对象(后续会讲)  根数据例子:this.$data就是根数据
  if(target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production'  && warn('xxxxxxxxxxxxxxxxxx');
    return val
  }
  // 判断target身上是否存在__ob__这个属性,如果不存在就说明不是响应式对象,直接赋值就行
  if(!ob){
    target[key] = val;
    return val;
  }
  // 能走到这说明就是新增的属性,这是就把这个属性设置为响应式,defineReactive把数据转换为getter/setter形式
  defineReactive(ob.value,key,val);
  // 向target依赖发出通知
  ob.dep.notify()
  return val;
}