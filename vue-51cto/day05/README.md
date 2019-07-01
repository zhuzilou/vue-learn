### Vue.js 五天 *汤小洋*

## 一、 准备工作

###１. 初始化项目
    vue init webpack itany
    cd itany
    cnpm install
    cnpm install less less-loader -D
    cnpm install vuex axios -S
    npm run dev

### 2. 项目资源
    |-reset.css
    |-data.json

### 3. 创建目录结构
    首先清除项目中的部分内容

    创建如下目录结构：
        |-data.json
        |-static
            |-css
                |-reset.css

### 4. 配置API接口，模拟后台数据
    使用express框架启动一个Node服务器，配置API接口，模拟后台数据
    新版vue-cli创建的项目目录中不再有dev.server.js文件，通过修改webpack.dev.conf.js文件来启动express服务器，[参考](https://segmentfault.com/q/1010000011988039?sort=created)
    1. 配置服务器及相应数据
    /**
    * 使用express框架启动一个服务器
    */
    const express = require('express')
    const app = express()
    //1. 读取文件
    var appData = require('../data.json')
    var seller = appData.seller;
    var goods = appData.goods;
    var ratings = appData.ratings;

    //2. 使用express配置路由，指定接口请求
    //定义一个路由
    var apiRoutes = express.Router();

    //暴露api接口，并在devserver中添加before(app){配置请求路由和响应}
    app.use('/api', apiRoutes)

    2. 找到devServer配置项，添加配置请求路由和响应
    before(app) {
      //配置请求路由和响应
      app.get('/api/seller', (req, res) => {
        res.json({
          errno: 0, //错误码
          data: seller
        })
      })
    ｝

    测试API：
     http://localhost:8080/api/seller
     http://localhost:8080/api/goods
     http://localhost:8080/api/ratings


## 二、项目整体结构开发     
