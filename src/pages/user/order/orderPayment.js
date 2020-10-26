import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Row, Col, Typography, Skeleton, Button,Tabs,Divider } from 'antd';
import PayDetail from './payDetail'


const { Text, Title } = Typography;
export class OrderPayment extends BaseComponent {
    constructor(props){
        super(props);
        this.state={
            skuId:-1,
            loading:false
        }
    }
    
    onClick=()=>{
        this.setState({loading:true})
        this.timeout(2000).then(()=>{
            this.pushNotification("success", "Payment success!")
            this.setState({loading:false})
            this.timeout(1000).then(()=>{
                this.props.history.push("/user/detail")
            })
        })
    }

    render(){
        return (
            <Row style={styles.container} type='flex' justify='center'>
                <Col xs={24} sm={20} lg={15}>
                    <Text style={{fontSize:40}}>Payment</Text>
                    <Row type='flex' justify='center' style={{marginBottom:200}}>
                        <PayDetail skuId={this.props.match.params.skuId} orderId={this.props.match.params.orderId}/>
                    </Row>
                    <Row type='flex' justify='end' style={{width:"100%",marginRight:20}}>
                        <Button 
                            onClick={this.onClick}
                            loading={this.state.loading}
                            icon="dollar" size="large" style={{fontSize:18}}>Pay!</Button>
                    </Row>
                </Col>
            </Row>
        );
    }
}

const styles = {
    container:{
        marginTop:"20px"
    }
}

