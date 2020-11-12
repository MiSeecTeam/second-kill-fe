import React,{Component} from "react";
import { Router, Route,withRouter } from "react-router-dom";
import { BackTop, Row, Layout,Col} from 'antd';
import {loginAsUser,loginAsAdmin,logout,} from '../../../redux/actions/action';
import {adminRoutes} from "../../../routes/routes";
import BaseComponent from "../../BaseComponent"
import PrivateRoute from "../../PrivateRoute"
import AuthModal from "../../auth/authModal"
import BaseSider from "./BaseSider"

import { connect } from 'react-redux';

const {Sider,Content}=Layout;
const mapStateToProps = state => ({
    user: state.identityReducer.user,
    admin: state.identityReducer.admin,
    sales: state.identityReducer.sales
})
class AdminLayout extends BaseComponent {
    constructor(props){
        super(props);
        this.state = {
            items:[
                {title: 'Home',icon: 'home',key: '/admin/home'},
                {title: 'Manage Stock',icon: 'stock',key: '/admin/stock'},
                {title: 'Manage MWs',icon: 'snippets',key: '/admin/mws'},
            ],
        }
    }
    
    componentWillMount(){
    }

    createRoutes = (routes) => {
        return (
            routes.map((prop, key) => {
                return <PrivateRoute 
                auth={prop.auth}
                path={prop.path} 
                component={prop.component} 
                key={key} role={2}
                user={this.props.admin}/>;
            })
        )
    };

    

    render(){
        return (
            <Layout style={{backgroundColor:"white"}}>
                <BackTop visibilityHeight={200} style={{zIndex:10}}/>
                <Sider 
                breakpoint="md"
                style={styles.sider}>
                    <BaseSider menus={this.state.items}/>
                </Sider>
                <Content style={{backgroundColor:"white",marginLeft:210}}>
                    <Row type="flex" justify="center">
                        <Col span={24}>
                        <Router history={this.props.history}>
                            {this.createRoutes(adminRoutes)}
                        </Router>
                        </Col>
                    </Row>
                </Content>
            </Layout>
            );
    }
}

const styles={
    sider:{
        height: '100vh',
        position:"fixed",
        backgroundColor:"white",
        width:200,
    },
}


export default connect(mapStateToProps)(withRouter(AdminLayout))