import React,{Component} from "react";
import * as Pages from "../pages";
import UserLayout from '../components/layouts/user/UserLayout'
import AdminLayout from '../components/layouts/admin/AdminLayout'
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { Form } from 'antd';

const mapStateToProps = state => ({
    user: state.identityReducer.user,
    admin:state.identityReducer.admin,
    title:state.drawerReducer.title,
    content: state.drawerReducer.content,
    loading: state.drawerReducer.loading,
})

var wrap = (component) => {
    return Form.create()(connect(mapStateToProps)(withRouter(component)))
}

const mainRoutes = [//默认路由（其实是第二层，第一层在隔壁index.jsx用来加载外层layout
    {
        path: "/user",
        icon: 'user',
        component: UserLayout,
        children:[
            {
                path: "/home",
                icon: 'home',
                component: wrap(Pages.User.Home),
            },
            {
                path: "/list",
                icon: 'list',
                component: wrap(Pages.User.ItemList),
            },
            {
                path: "/detail/:itemId",
                icon: 'detail',
                component: wrap(Pages.User.ItemDetail),
            },
            {
                path: "/orderplace/:skuId",
                icon: 'order',
                component: wrap(Pages.User.OrderPlacing),
                auth:true
            },
            {
                path: "/orderpay/:orderId",
                icon: 'order',
                component: wrap(Pages.User.OrderPayment),
                auth:true
            },
            {
                path: "/orderlist",
                icon: 'order',
                component: wrap(Pages.User.OrderList),
                auth:true
            }
        ]
    },
    {
        path: "/admin",
        icon: 'admin',
        component: AdminLayout,
        children:[
            {
                path: "/home",
                icon: 'home',
                component: Pages.Admin.Home,
                auth:true
            },
            {
                path: "/stock",
                icon: 'home',
                component: Pages.Admin.Stock,
                auth:true
            },
            {
                path: "/mws",
                icon: 'home',
                component: Pages.Admin.Redis,
                auth:true
            }

        ]
    }
    // {
    //     path: "/signin",
    //     icon: 'signin',
    //     component: wrap(Pages.SignIn),
    // },
    // use Drawer Instead
];

export default mainRoutes;
const userRoutes = _.find(mainRoutes, { path: '/user'}).children;
const adminRoutes = _.find(mainRoutes, { path: '/admin'}).children;
export {userRoutes, adminRoutes}