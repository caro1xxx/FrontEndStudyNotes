// 宏命令是一组命令的集合，通过执行宏命令的方式，可以一次执行一批命令
// 换句话说,就是我只需要发出一条指令,就可以将宏命令中的所有命令触发
/* 
  实现原理：
    把每个命令封装,然后定义一个宏命令,在宏命令中定义execute方法,用于执行宏命令中的每个命令
    再定义add方法用于向宏命令添加命令,所有需要定义一个缓存列表,用于存放命令
    当然可以为宏命令添加撤销操作
*/

// 宏命令是命令模式和组合模式的产物

var closeDoorCommand = {
  execute: function () {
    console.log('关门');
  }
};
var openPcCommand = {
  execute: function () {
    console.log('开电脑');
  }
};
var openQQCommand = {
  execute: function () {
    console.log('登录 QQ');
  }
};

var MacroCommand = function () {
  return {
    commandsList: [],
    add: function (command) {
      this.commandsList.push(command);
    },
    execute: function () {
      for (var i = 0, command; command = this.commandsList[i++];) {
        command.execute();
      }
    }
  }
};
var macroCommand = MacroCommand();
macroCommand.add(closeDoorCommand);
macroCommand.add(openPcCommand);
macroCommand.add(openQQCommand);

macroCommand.execute(); 