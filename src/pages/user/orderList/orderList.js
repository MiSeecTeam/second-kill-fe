import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Row, Col, Typography, Skeleton, Button,Tabs,Divider } from 'antd';

const { Text, Title } = Typography;
export class OrderList extends BaseComponent {

    constructor(props){
        super(props);
        this.state={
            orderList:[]
        }
    }


    handleLength=(content,len)=>{
        if(content&&content.length>len){
            return content.slice(0,len-1)+"..."
        }
        return content
    }

    componentDidMount(){
        
        var successAction = (result) => {
            if(result.success){
                this.setState({orderList:result.content})
            }else{
                this.pushNotification("danger", "Loading Item list failed");
            }
        }
        
        const user=this.loadStorage("user")
        this.get('/order/getOrderList?userId='+user.id, successAction);
    }

    renderItem=(item)=>{
        const {orderId,skuId,gmtCreated,gmtModified,finished,amount}=item
        return(
             <Button style={styles.container} type="link">
                <Row type='flex' justify='start' style={{marginTop:40,fontSize:18,width:"100%"}}>
                    <Row type="flex" justify="center" style={styles.container2}>
                        <Col span={2} >
                            <Row style={styles.courseItem}>OrderId</Row>
                            <Typography style={styles.content}>
                                {orderId}
                            </Typography>
                        </Col>

                        <Col span={2} >
                            <Row style={styles.courseItem}>SkuId</Row>
                            <Typography style={styles.content}>
                                {skuId}
                            </Typography>
                        </Col>

                        <Col span={6} >
                            <Row style={styles.courseItem}>Created At</Row>
                            <Typography style={styles.content}>
                                {gmtCreated}
                            </Typography>
                        </Col>

                        <Col span={6} >
                            <Row style={styles.courseItem}>Updated At</Row>
                            <Typography style={styles.content}>
                                {gmtModified}
                            </Typography>
                        </Col>

                        <Col span={3}>
                            <Row style={styles.courseItem}>Status</Row>
                            <Typography style={styles.content}>
                                {finished?"Paid":"Not Paid"}
                            </Typography>
                        </Col>
                        <Col span={4}>
                            <Row style={styles.courseItem}>Amount</Row>
                            <Typography style={styles.content}>
                                {amount}
                            </Typography>
                        </Col>
                        <Divider style={{marginTop:10,marginBottom:0}}/>
                    </Row>
                </Row>
            </Button>
        )
    }

    render(){
        console.log(this.state.itemList)
        return (
            <Row style={{marginTop:100}}>
                
                <Row id="listStart" type='flex' justify='center'>
                    <Col xs={22} sm={20} lg={18}>
                        <h2 style={styles.titles}>Order List</h2>
                    </Col>
                </Row>
                <Row  type='flex' justify='center'>
                    <Col xs={22} sm={20} lg={18}>
                        <Row  type='flex' justify='start'>
                            {this.state.orderList.map(this.renderItem)}
                        </Row>
                    </Col>
                </Row>
            </Row>
        );
    }
}

const styles = {
    container:{
        width:"100%",
        height: '60px',
        margin:30,
        padding:0,
        border:0
    },
    container2:{
        width:"100%",
        height: '60px',
        marginTop:30,
        padding:0,
        border:0
    },
    content:{
        marginTop:10,
        padding:10
    }
}

