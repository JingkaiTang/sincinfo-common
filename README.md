# Sincinfo Common

> 公共组件、样式 用于sincinfo项目

## 使用
### 安装
```
npm install --save sincinfo-common
```

### 引用
> 此pkg依赖Vue以及iView

```
import Vue from 'vue'
import iView from 'iview'
import SincinfoCommon from 'sincinfo-common'

import 'iview/dist/styles/iview.css'
import 'sincinfo-common/dist/sincinfo-common.css'

Vue.use(iView)
Vue.use(SincinfoCommon)
```

## 可用组件
- MainFrame 页面框架
- SidebarMenu 侧边菜单栏
- BreadcrumbBar 面包屑导航栏

## MainFrame
- 包含了SidebarMenu以及BreadcrumbBar的组件，作为整体页面框架使用
- 使用样例参见HelloWorld.vue

### menu菜单数据格式
- 样例参见menu/index.js
- 标准格式
```
{
  name: 'MenuName', // 菜单显示的名字 必选
  route: 'RouteName', // 菜单对应路由的名字 有子菜单时此项不填
  icon: 'IconTypeName', // 菜单对应图标的名字 此项不填时图标随机
  children: [{...}, ...] // 子菜单 可选
}
```

### 使面包屑导航栏生效
- 样例参见路由信息定义
- 标准格式 路由单元
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

## SidebarMenu
- 无需单独使用

## BreadcrumbBar
- 无需单独使用
