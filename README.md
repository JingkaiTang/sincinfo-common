# Sincinfo Common

> 公共组件、样式 用于sincinfo项目

涵盖：
- 主应用样式框架（包含大小可切换的导航菜单、面包屑导航栏、标签页管理等）
  - 取材于[iview-admin](https://github.com/iview/iview-admin)
- 间隙按钮组（用于表格操作中）
- 日历组件
  - 取材于[vue-calendar](https://github.com/jinzhe/vue-calendar)
  - 源码来自该项目早期代码
  - 由[gxy00926156](https://github.com/gxy00926156)贡献
- 富文本编辑器
  - 来自[tinymce](https://github.com/tinymce/tinymce)的封装
  - 由[lixufeng1992](https://github.com/lixufeng1992)贡献
- 可拖拽表格
  - 取材于[iview-admin](https://github.com/iview/iview-admin)
  - 由[Doris-Wang](https://github.com/Doris-Wang)贡献

## 使用
### 安装

```
npm install --save sincinfo-common
```

### 依赖
- vue
- vuex
- iview

### 引用

```
import Vue from 'vue'
import Vuex from 'vuex'
import iView from 'iview'

import 'iview/dist/styles/iview.css'
import 'sincinfo-common/dist/sincinfo-common.css'

import {SincinfoCommon, ScStore, ScHelper} from 'sincinfo-common'
import App from './App'
import router from './router'


Vue.use(iView)
Vue.use(Vuex)
Vue.use(SincinfoCommon)

// 状态管理
const store = new Vuex.Store({
  state: {
    ...ScStore.state, // 引用内置状态
    mainPageRoute: 'index', // 设定主页路由名称
    excludedRouteList: ['Page2-2'] // 添加tag例外路由，也可以通过再路由信息的meta中添加`untagged: true`达到相应效果
  },
  mutations: {
    ...ScStore.mutations // 引用内置状态
  }
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  ScHelper.beforeRoute(store, to)
  next()
  iView.LoadingBar.finish()
})
```

## 可用组件
- MainFrame 页面框架
- GapButtonGroup 按钮组
- Calendar 日历组件
- DragableTable 可拖拽表格
- MceView 富文本编辑器

## MainFrame
- 包含了SidebarMenu以及BreadcrumbBar的组件，作为整体页面框架使用
- 使用样例参见HelloWorld.vue

### 支持的属性
- menu 详见下文
- logo 自定义logo 可选
```
{
  max: 'url to max logo',
  min: 'url to min logo'
}
```
- messageBox 消息按钮
```
{
  show: true, // 显示该按钮
  action: () => {}, // 按钮响应的操作
  count: 12 // 消息计数
}
```
- userDropdown 用户头像及下拉菜单
```
{
  username: 'User name',
  avatar: 'url to avatar', // 用户头像的url
  dropdown: [
    {
      name: 'xxx', // 菜单项显示的名字
      action: () => {} // 该项菜单的操作
    }
  ]
}
```

### menu菜单数据格式
样例参见menu/index.js

标准格式
```
{
  name: 'MenuName', // 菜单显示的名字 必选
  route: 'RouteName', // 菜单对应路由的名字 有子菜单时此项不填
  icon: 'IconTypeName', // 菜单对应图标的名字 此项不填时图标随机
  children: [{...}, ...] // 子菜单 可选
}
```

### 使面包屑导航栏生效
样例参见路由信息定义router/index.js

标准格式 路由单元
```
{
  ..., // 其他路由信息
  meta: { // meta信息记录着业务层级相关信息
    name: 'name in web', // 当前路由所代表页面的名字
    plain: true/false, // 是否为虚拟节点 仅仅代表逻辑层级
    parent: parent_route // 上一层级的引用
  }
}
```

## GapButtonGroup
### 支持的属性
- group
```
[
  {
    name: 'button name', // 按钮显示的文字
    action: () => {} // 按钮的点击事件
  },
  ...
]
```
- grid 一行显示的格子数

## Calendar
### 支持的属性
- events 事件数组
```
[
  {
    date: '2017-11-11', // 事件发生的日期
    events: [
      {
        time: '11:11', // 事件发生的时间
        content: 'blablabla' // 事件描述
      },
      ...
    ]
  },
  ...
]
```
- onDayClick 响应点击事件
```
(day, events) => { // day 日期
  // ...
}
```

## DragableTable
### 支持的属性
- refs 引用名
- columnsList 同iview中Table的columns
- tableData 同iview中Table的data
- start 开始拖动时响应的函数
- end 结束拖动时响应的函数
- choose 选中时响应的函数
```
// start/end/choose的函数签名同为，el为选中的元素的一个事件包装，详见Sortable.js
(el) => {}
```

## MceView
### 支持的属性
- 支持`v-model`绑定富文本内容
- size 富文本编辑器的大小
