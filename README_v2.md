<!--
![xueersi.com](https://raw.github.com/xueersi/TeacherPlatform/master/img/logo.png)
-->

#教师课程运营平台

##一、版本

| Version |   Update   |         Author        |     Logs              
|:-------:|:----------:|:--------------------- |:-------------------------
|  v0.1   | 2012-10-18 |  [Liu Yanbin][lyb]    | Create HTML/CSS       
|  v0.2   | 2012-10-19 |  [Liu Chengjun][lcj]  | Create JavaScript     
|  v0.3   | 2012-10-24 |  [Wu Jie][marco]      | Framework      
|  v0.4   | 2012-10-25 |  [Wu Jie][marco]      | Add JS Template      

##二、目录结构

	---
	 |---- doc/					说明文档
	 |	|-----images.md		背景图片索引
	 |	|-----javascript.md	javascript手册
	 |	|-----tpl.md	 		模板语法
	 |	|-----css.md			样式说明	 	 
	 |	|-----example.md	 	演示/示例	 
	 |	|-----test.md	 		测试手册
	 |	|-----tools.md	 		前端工具说明	 
	 |	
	 |---- css/
	 |	|-----base.css			基础样式（只有全局样式以及公用方法）
	 |	|-----platform.css	 	平台所需样式（合并后的）
	 |
	 |---- img/
	 |	|-----bg.png			全局背景（整合后）
	 |	|-----bg-min.png		小背景图（整合后）
	 |	|-----bg-line.png		线条类背景图
	 |	|-----icon.png			图标（整合后）
	 |	|-----tmp-video.png		临时文件-播放器
	 |	|-----line.png			线条图（整合后）
	 |	 	 	 	 	 	 
	 |---- js/
	 |	|----- api/				对外接口
	 |	|----- app/				应用扩展
	 |	|----- import/			生成的页面调用文件
	 |	|----- tools/			工具组件
	 |	|----- ui/				页面中的ui组件
	 |	|----- widget/			引入的外部文件
	 |	|-----xes.register.js		应用注册接口文件
	 |	|-----xes.boot.js		启动文件
	 |	|-----xes.browser.js	浏览器检测组件
	 |	|-----xes.cookie.js		cookie操作组件
	 |	|-----xes.base.js		基础类（jquery库）
	 |	|-----xes.js			索引文件（或打包合并后的生成文件）
	 |	 	 	 
	 |----index.html			首页
	 |----login.html 			登录页
	 |----list.html				课程列表页
	 |----edit.html				编辑课程详情页
	 |----view.html				课程视频播放页
	 |----preview.html			课程编辑后的预览页
	 |----README.md				说明稳定（Markdown语法）
	 |----TODO.md				todo list内容
	 
##三、说明文档

1. [JavaScript库指南][1]
2. [背景图索引][2]
3. [样式手册][3]
4. [模板语法][4]
5. [演示][5]
6. [测试手册][6]


[1]:doc/javascript.md
[2]:doc/images.md
[3]:doc/css.md
[4]:doc/tpl.md
[5]:doc/example.md
[6]:doc/test.md

##四、更新日志

**0.4.5** : `2012-10-29 3:40`	--by: [Wu Jie][marco]
> 修改select组件	
> 增加tabs组件框架	
> 重置样式改为Alice基础样式

**0.4.4** : `2012-10-27 22:00`	--by: [Wu Jie][marco]
> 增加Select组件（交互脚本）

**0.4.3** : `2012-10-26 14:40`	--by: [Wu Jie][marco]
> 增加Select组件（仅样式部分）

**0.4.2** : `2012-10-26 11:20`	-- by: [Liu Yanbin][lyb]
> 背景图整合，页面中的icon均采用背景图

**0.4.1** : `2012-10-25 1:10`	
> 增加测试模块

**0.4.0** : `2012-10-25 0:20`
> 增加模板引擎文件 [Juicer][e3]

**0.3.1** : `2012-10-24 23:30`
> 重命名样式文件		
> 重命名JS文件

**0.3.0** : `2012-10-24 19:00`
> 将静态页托管至[github][e4]



##五、链接

+ [Alice][e1]样式库
+ [jQuery][e2]手册
+ [Juicer][e3]模板引擎
+ [Github][e4]帮助
+ Power by: [xueersi.com][e5]

[e1]:http://aliceui.com
[e2]:http://www.css88.com/jqapi-1.7/
[e3]:http://juicer.name
[e4]:http://www.worldhello.net/
[e5]:http://www.xueersi.com



[lyb]:mailto:liuyanbin@xueersi.com
[sjg]:mailto:shijiangang@xueersi.com
[lcj]:mailto:liuchengjun@xueersi.com
[marco]:mailto:wujie@xueersi.com