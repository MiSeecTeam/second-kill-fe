import React from 'react'
import {Link,withRouter} from 'react-router-dom'
import {loginAsUser,loginAsAdmin,logout,} from '../../../redux/actions/action';
import {Paper} from '@material-ui/core';
import {Menu, Icon,Row,Button} from 'antd'
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  user: state.identityReducer.user,
  admin: state.identityReducer.admin,
  sales: state.identityReducer.sales
})
class BaseSider extends React.Component {
  state = {
    openKeys: [],
    selectedKeys: []
  }

  componentDidMount() {
    const pathname = this.props.location.pathname
    const rank = pathname.split('/')
    switch (rank.length) {
      case 2 :  
        this.setState({
          selectedKeys: [pathname]
        })
        break;
      case 5 : 
        this.setState({
          selectedKeys: [pathname],
          openKeys: [rank.slice(0, 3).join('/'), rank.slice(0, 4).join('/')]
        })
        break;
      default :
        this.setState({
          selectedKeys: [pathname],
          openKeys: [pathname.substr(0, pathname.lastIndexOf('/'))]
        })
    }
  }

  componentWillReceiveProps(nextProps) {
    const pathname = nextProps.location.pathname
    if (this.props.location.pathname !== pathname) {
      this.setState({
        selectedKeys: [pathname],
      })
    }
  }

  onOpenChange = (openKeys) => {
    if (openKeys.length === 0 || openKeys.length === 1) {
      this.setState({
        openKeys
      })
      return
    }

    const latestOpenKey = openKeys[openKeys.length - 1]
    if (latestOpenKey.includes(openKeys[0])) {
      this.setState({
        openKeys
      })
    } else {
      this.setState({
        openKeys: [latestOpenKey]
      })
    }
  }

  renderMenuItem = ({key, icon, title,}) => {
    return (
      <Menu.Item style={{height:50,fontSize:18}} key={key}>
        <Link to={key}>
          {icon && <Icon style={{fontSize:18}} type={icon}/>}
          <span>{title}</span>
        </Link>
      </Menu.Item>
    )
  }

  renderSubMenuItem = ({key, icon, title,}) => {
    return (
      <Menu.Item style={{height:40,marginTop:10,fontSize:16}} key={key}>
        <Link to={key}>
          {icon && <Icon style={{fontSize:16}} type={icon}/>}
          <span>{title}</span>
        </Link>
      </Menu.Item>
    )
  }

  renderSubMenu = ({key, icon, title, subs}) => {
    return (
      <Menu.SubMenu style={{marginBottom:18}} key={key} title={<span style={{fontSize:18}}>{icon && <Icon style={{fontSize:18}} type={icon}/>}<span>{title}</span></span>}>
        {subs.map(item => {
            return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderSubMenuItem(item)
        })}
      </Menu.SubMenu>
    )
  }

  onCancel=()=>{
    sessionStorage.clear()
    localStorage.clear()
    this.props.dispatch(logout())
    this.props.history.push("/user/home")
  } 

  renderCancel=()=>{
      return(
          <Menu.Item style={{height:50,fontSize:18,marginTop:350}} key={"/user/home"}>
              <Button style={{height:50,fontSize:18,padding:0,border:0}} onClick={this.onCancel} type="default">
                <Row type="flex" justify="start" align="middle">
                  <Icon style={{fontSize:18,marginRight:0}} type="vertical-right"/>
                  <span>Exit Admin</span>
                </Row>
              </Button>
          </Menu.Item>
      )
  }

  render() {
    const {openKeys, selectedKeys} = this.state
    return (
        <Paper elevation={3} style={{height:document.body.scrollHeight,width:200}}>
            <Row type="flex" align="middle">
                <img style={styles.img} src={require('./resource/logo_admin.png')}/>
                <Menu
                style={{height:"100%",border:0}}
                onOpenChange={this.onOpenChange}
                onClick={({key}) => this.setState({selectedKeys: [key]})}
                openKeys={openKeys}
                selectedKeys={selectedKeys}
                theme={'light'}
                mode='inline'>
                  {this.props.menus.map(item => {
                      return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                  })}
                  {this.renderCancel()}
                </Menu>
            </Row>
        </Paper>
    )
  }
}

const styles={
    img:{
        height:65,
        width:180,
        marginLeft:10,
        marginTop:20,
        marginBottom:20
    }
}


export default connect(mapStateToProps)(withRouter(BaseSider))