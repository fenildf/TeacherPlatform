# 样式手册
## 1. 目录结构

	---
	 |---- css/					说明文档
	 |	|-----import/			生成后的文件
	 |	|-----pages/			索引文件
	 |	|-----module/			模块文件
	 |	|-----ui/				UI组件
	 |	|-----platform.css		平台文件
	 |	|-----xes.css			全局文件
	 |	

## 2. 页面调用规则

### 2.1. 上线之前（本地调试）：

> 每个页面只引入一个 `pages` 文件夹下的css文件，如：`pages/page_list.css`

### 2.2. 上125测试

> 讲页面中引入的 pages文件更换成 `import` 文件夹下的对应文件，如：`import/xes_list.css`


## 3. 编写规范

### 3.1. pages索引文件的写法

	@charset "UTF-8";

	/* 
	 * xesui样式库索引文件
	 * 主要负责对需要合并的样式进行索引
	 * 上线前需要利用合并工具进行合并、压缩
	 * 
	 * 下面湿要引入的文件列表
	 **/

	@import url("base.css");					
	@import url("platform.css");
	@import url("ui-select.css");
	@import url("view.css");
	
> a. 第一行文件编码必须要写
> b. 第二行开始写此文件的注释说明
> c. 之后开始写需要引入的文件，每个一行
	
### 3.2. 模块写法

	/* ==================== base.css ===================== */

	/* 
	 * @name: base
	 * @marks: 重设浏览器默认样式
	 * @update: 2012-10-25
	 * @author: Wu Jie (Marco)		
	*/
	body {}
	
> a. 第一行写此模块的文件名
> b. 第二行开始写此模块的名称、功能、作者、更新日期等注释内容
> c. 之后开始模块正文

### 3.3. UI组件写法

> 基本上与模块写法类似

### 3.4. 背景图
背景图路径：`http://img03.xesimg.com/`  
指向的是本地 `http://teacher.com/img/` 目录

