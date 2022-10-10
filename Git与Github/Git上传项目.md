> 如果是一台新电脑,那么需要绑定ssh key

```bash
ssh-keygen -t rsa -C  "caro1xxxhv@gmail.com"
```

> 之后一直回车会自动生成秘钥文件,在administrator路径下的pua文件
>
> 把pua文件的内容复制到github设置里面的ssh里面

> 创建

```bash
ssh -T git@github.com  //测试是否连接github
git config --global user.name 'caro1xxx' //创建登录名
git config --global user.email 'caro1xxxhv@gmail.com' //创建邮箱
```

> 在项目文件夹下git init 生成.git文件

> git add . 上传全部文件 git add 文件名 上传指定

>  git commit -m "注释"  项目提交到仓库 

> git branch -M main 切换main分支

> `git remote add origin https://github.com/caro1xxx/OOPS-WebFullstack.git` 连接

> 首次提交  git push -u origin main 

![image-20211206095037901](C:\Users\chenlong\AppData\Roaming\Typora\typora-user-images\image-20211206095037901.png)

> 再一次提交

```bash
git branch //查看当前在那个分支中
git checkout //切换到指定分支
git add .//增加所有文件（包括后来添加的，也可以指定添加那个文件$ git add xxx.txt）
git status //查看当前状态（时刻全程监控）
git commit -m “说明”//增加说明
git push //提交到远程仓库
```

