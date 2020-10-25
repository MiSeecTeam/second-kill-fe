import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Row, Col, Typography, Skeleton, Button,Tabs,Divider } from 'antd';
import OrderDetail from './orderDetail'
import AddressDetail from './addressDetail'


const { Text, Title } = Typography;
export class OrderPlacing extends BaseComponent {
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
            this.pushNotification("success", "Order Placed! Redirecting to Payment")
            this.setState({loading:false})
            this.timeout(1000).then(()=>{
                let orderId = 10001
                this.props.history.push("/user/orderpay/"+orderId)
            })
        })
    }

    render(){
        return (
            <Row style={styles.container} type='flex' justify='center'>
                <Col xs={24} sm={20} lg={15}>
                    <Text style={{fontSize:40}}>Place My Order</Text>
                    <AddressDetail/> 
                    <Row type='flex' justify='center' style={{marginBottom:200}}>
                        <OrderDetail skuId={this.props.match.params.skuId}/>
                    </Row>
                    <Row type='flex' justify='end' style={{width:"100%",marginRight:20}}>
                        <Button 
                            onClick={this.onClick}
                            loading={this.state.loading}
                            icon="shopping-cart" size="large" style={{fontSize:18}}>Place Order</Button>
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

