import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Row, Col, AutoComplete, Select, Divider, Typography } from 'antd';

export class Home extends BaseComponent {
    constructor(props){
        super(props);
        this.state={
        }
    }

    render(){
        const {current}=this.state
        return (
            <Row style={styles.container}>
                <Col span={24}>
                    <Row type="flex" justify="center">
                        <img style={styles.img} src={require('./resource/logo_admin.png')}/>
                    </Row>
                </Col>
                <Col style={{marginTop:50}} span={24}>
                    <Row type="flex" justify="center">
                        <Typography style={styles.welcome}>Welcome To The Admin Interface</Typography>
                    </Row>
                </Col>
            </Row>
        );
    }
}

const styles = {
    welcome:{
        fontSize:30,
        opacity:0.6
    },
    container:{
        marginTop:"200px",
    },
    img:{
        height:"200px",
        width:"500px",
        opacity:0.4
    }
}

