# 基于vue脚手架的单页面应用模板

## 使用帮助
1. spvue init [project-name]
2. 进入[project-name]目录执行npm install 安装项目依赖包
3. 执行 sudo npm run dev 项目启动，访问链接为：http://minner.jr.jd.com:80 （需要将minner.jr.jd.com指向本地项目才可启动，域名可自行去/config/index.js中的host选项配置）

## 发布预发环境
1. 电脑中需要安装jdf(npm install jdf -g),需要node6.3.1版本
2. 进入[project-name]目录执行npm run build 安装项目依赖包（node9.0.0及以上）
3. 进入[project-name]目录执行npm run upload 安装项目依赖包（node6.3.1）

## 发布生产环境

进入[project-name]/dist目录，将[project-name].zip手动复制到生产目录，然后再做后续上线处理

