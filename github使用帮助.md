### 这是教师平台托管到github上的更新页面.
下面是一些git的常用操作说明

```
$ cd ~/work/github/xueersi/TeachPlatform
$ vim README.md                // 编辑README.md文件
$ git add README.md            // 添加文件内容的索引
$ git commit -m '发布说明'      // 记录修改到版本库 -m 添加发布说明
```
// 下面是第一次提交到远程分支，之后可以忽略
```
    $ git remote add origin git@github.com:xueersi/TeacherPlatform.git
```

```
$ git pull origin              // 从另外的分支进行提取与合并
$ git push origin              // 更新远程文件以及关联的对象
```

```
// $ git checkout master     // 切换版本
```

下面是更新日志.

### 2012-10-24 14:14:44 ###
> 更新README.md文件

> 重新规划目录结构

> 文件路径规划
