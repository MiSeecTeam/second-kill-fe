import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Row, Col, Badge, Button, Divider, Statistic, Typography } from 'antd';

const {Title}=Typography
export class Redis extends BaseComponent {
    constructor(props){
        super(props);
        this.state={
            itemCount:'-',
            skuCount:'-',
            messageReady:'-',
            messageUnack:'-',
            text:"Unknown",
            text2:"Unknown"
        }
    }

    onFresh=()=>{
        var successAction = (result) => {
            this.setState({itemCount:result.content.itemCount,skuCount:result.content.skuCount,text:"Running"})
            this.pushNotification("success", "Redis Status Refreshed");
        }

        var unsuccessAction = (result) => {
            this.setState({itemCount:'-',skuCount:'-',text:"Unknown"})
            this.pushNotification("danger", result.message);
        }

        this.get("/item/count", successAction, unsuccessAction)

        var successAction2 = (result) => {
            this.setState({messageReady:result.content.queue_totals.message_ready,messageUnack:result.content.queue_totals.message_unacknowledged,text2:"Running"})
            this.pushNotification("success", "MQ Status Refreshed");
        }

        var unsuccessAction2 = (result) => {
            this.setState({messageReady:'-',messageUnack:'-',text2:"Unknown"})
            this.pushNotification("danger", result.message);
        }

        this.get("/mqMonitorStat", successAction2, unsuccessAction2)
    }

    onClick=()=>{
        this.onFresh();
    }

    componentDidMount(){
        this.onFresh();
    }

    refreshRedis=()=>{
        var successAction = (result) => {
            this.pushNotification("success", result.message);
            this.onFresh();
        }

        var unsuccessAction = (result) => {
            this.pushNotification("danger", result.message);
        }

        this.get("/config/refresh", successAction, unsuccessAction)

    }

    render(){
        return (
            <Row style={styles.container} type="flex" justify="center">
                    <Col span={18} style={{marginTop:20}}>
                        <Row type="flex" justify="start">
                            <Col span={24}>
                                <Title style={{marginLeft:10,marginTop:20}} level={3}>
                                    Redis Status
                                </Title>
                            </Col>
                            <Badge style={{marginLeft:20}} status="processing" text={this.state.text} />
                            <Divider/>
                        </Row>
                    </Col>
                    <Col span={18} style={{marginTop:20}}>
                        <Row type="flex" justify="start">
                            <Statistic style={{marginLeft:10}} title="Item Counts" value={this.state.itemCount} />     
                            <Statistic style={{marginLeft:30}} title="Sku Counts" value={this.state.skuCount} />
                            <Divider/>
                        </Row>
                    </Col>
                    
                    <Col span={18} style={{marginTop:20}}>
                        <Row type="flex" justify="start">
                            <Col span={24}>
                                <Title style={{marginLeft:10,marginTop:20}} level={3}>
                                    RabbitMQ Status
                                </Title>
                            </Col>
                            <Badge style={{marginLeft:20}} status="processing" text={this.state.text2} />
                            <Divider/>
                        </Row>
                    </Col>
                    <Col span={18} style={{marginTop:20}}>
                        <Row type="flex" justify="start">
                            <Statistic style={{marginLeft:10}} title="Message Ready" value={this.state.messageReady} />     
                            <Statistic style={{marginLeft:30}} title="Message Unack" value={this.state.messageUnack} />
                            <Divider/>
                        </Row>
                    </Col>
                    <Col span={18} style={{marginTop:20}}>
                        <Title style={{marginLeft:10,marginTop:20}} level={3}>
                            Operations
                        </Title>
                    </Col>
                    <Col span={18} style={{marginTop:20}}>
                        <Row type="flex" justify="start">
                            <Button onClick={this.refreshRedis} style={{width:200}} type="primary" size="large"> Update Redis Buffer </Button>
                        </Row>
                    </Col>
            </Row>
        )
    }
}

const styles = {
    welcome:{
        fontSize:30,
        opacity:0.6
    },
    container:{
        marginTop:"100px",
    }
}

