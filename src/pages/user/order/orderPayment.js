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

        let form = new FormData();
        form.append('orderId', this.props.match.params.orderId);
        
        var successAction = (result) => {
            this.pushNotification("success", "Payment success!")
            this.setState({loading:false})
            this.timeout(1000).then(()=>{
                this.props.history.push("/user/list")
            })
        }

        var unsuccessAction = (result) => {
            this.pushNotification("danger", result.message);
        }

        this.post("/order/pay", form, successAction, unsuccessAction)
    }

    render(){
        return (
            <Row style={styles.container} type='flex' justify='center'>
                <Col xs={24} sm={20} lg={15}>
                    <Text style={{fontSize:40}}>Payment</Text>
                    <Row type='flex' justify='center' style={{marginBottom:200}}>
                        <PayDetail orderId={this.props.match.params.orderId}/>
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

