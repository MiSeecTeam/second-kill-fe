import React,{Component} from "react";
import { Router, Route,withRouter,Redirect } from "react-router-dom";
import { BackTop, Row, Layout} from 'antd';
import {loginAsUser,loginAsAdmin,logout} from '../../redux/actions/action';
import mainRoutes from "../../routes/routes";
import PrivateRoute from "../PrivateRoute"
import BaseComponent from "../BaseComponent"

import { connect } from 'react-redux';

const {Header,Content}=Layout;
const mapStateToProps = state => ({
    user: state.identityReducer.user,
    admin: state.identityReducer.admin
})
class BaseLayout extends BaseComponent {
    
    constructor(props){
        super(props);
        this.state = {
            admin:false,
        }
    }


    componentWillMount(){
        if(sessionStorage.getItem("admin")!=null){//如果为超管
            this.state.admin=true
            const admin=JSON.parse(sessionStorage.getItem("admin"))
            this.props.dispatch(loginAsAdmin(admin))
        }
        this.refreshUser()
        
    }

    getDefaultRoute=()=>{
        if(this.props.history.location.pathname.indexOf("/user")==-1)
            if(!this.state.admin&&!this.props.admin){
                return(<Redirect to={"/user/home"}/>)
            }
        return null
    }

    createRoutes = (routes) => {
        return (
            routes.map((prop, key) => {
                if(prop.auth==true)
                    return <PrivateRoute 
                    role={-1}
                    path={prop.path} 
                    component={prop.component} 
                    key={key} 
                    user={this.props.user}/>;
                else
                    return <Route 
                    path={prop.path} 
                    component={prop.component} 
                    key={key}/>;
            })
        )
    };    

    refreshUser(){
        const user=this.loadStorage("user")
        if(user&&user.id){
            const id=user.id
            const role=user.role
            var successAction=(result)=>{
                if(role==0)
                    this.props.dispatch(loginAsUser(result.content))
                else if(role==2)
                    this.props.dispatch(loginAsAdmin(result.content))
                this.pushNotification("success","User info updated")
            }
            var unsuccessAction=(result)=>{
                this.props.dispatch(logout())
                localStorage.clear()
                this.pushNotification("danger","Session expired. Please Login again.")
            }
            var errorAction=()=>{
                this.props.dispatch(logout())
                localStorage.clear()
            }
            this.getWithErrorAction("/getUser?userId="+id,successAction,unsuccessAction,errorAction)
        }else{
            this.props.dispatch(logout())
            localStorage.clear()
        }
    }

    render(){
        return (
            <Layout>
                <Content style={{backgroundColor:"white"}}>
                    <Router history={this.props.history}>
                        {this.createRoutes(mainRoutes)}
                        {this.getDefaultRoute()}
                    </Router>
                </Content>
            </Layout>
            );
    }
}



export default connect(mapStateToProps)(withRouter(BaseLayout))