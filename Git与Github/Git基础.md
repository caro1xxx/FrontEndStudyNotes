#### git高层命令

```bash
#初始化git目录
git init
#提交进暂存区
git add ./ | 文件路径
#提交进提交区
git commit -m '注释'
#提交到远程仓库
git push
#查看状态
git status
```

#### git 三个概念

1. git对象(type=blob) ->即.git目录下的object文件夹下的就是git对象

   git对象只代表一个文件的版本

2. tree对象(type=tree) ->即一个项目的完整版本

3. 提交对象(type=commit) -> 即包装tree对象后能让我们进行提交一个注释

#### git 底层命令

```bash
git hash-object -w 文件名
output:dhoiahdoiawjd. hash值
并且在object目录下生成一个文件，这个hash值就是取这个文件的键

git cat-file -p <hash value> 查看hash文件的内容
git cat-file -t <hash value> 查看hash文件的类型

git ls-files -s 显示在暂存区中的所有文件，在进行提交暂存区后，暂存区不会被清空

git commit -a -m '注释' 执行git add. + git commit -m '注释' 组合操作

#将文件提交到暂存区
git update-index --add --cacheinfo 100644(100644代表是普通文件类型) <hash value> <file name>
#生成树对象
git write-tree
#将一个树对象加入另外一个树对象，使其成为一个新树对象那个
git read-file --prefix=bak <hash value>
git write-tree
 
git commit-tree 生成提交对象，并且将对应的树对象提交到本地库

git log 查看历史记录
```

#### 分支

```bash
#创建分支
git branch xxx

#切换分支
git checkout xxx

#删除分支
git branch -d xxx

#查看当前分支的最后一次提交
git branch -v

#新建一个分支并将这个分支指向这个提交对象
git branch xxx <提交对象hash>

#合并分支
git branch –merged

#查看项目历史分支记录
git log --oneline --decorate --graph --all

#合并分支
git merge 分支名
```

#### git存储 (git存储类似于栈，先进后出)

```bash
#当出现在本分支上做到一半时还有对象未提交需要切换到其他分支时，但又不想提交，就可以使用git存储
#存储
git stash

#存储列表
git stash list

#删除git存储列表第一个对象
git stash pop

#将git存储对象中指定的对象应用到当前分支
git stash apply 存储对象名

#移除指定git存储对象
git stash drop <存储对象名>
```

#### git撤销

```bash
#这个命令会将暂存区中的文件提交,并且运行你更改提交注释
git commit –amend

#将文件从暂存区中撤回到工作目录
git reset HEAD 文件名

#将在工作目录中对文件的修改撤销
git checkout -- 文件名
```

