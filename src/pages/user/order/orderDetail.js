import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Row, Col, Typography, Skeleton, Button,Tabs,Divider } from 'antd';


const { Text, Title } = Typography;
export default class OrderDetail extends BaseComponent {
    constructor(props){
        super(props);
        this.state={
            skuId:this.props.skuId,
            itemName:"Wristwatch by Ted Baker London",
            skuName:"Silver Type",
            itemDesc:"By the 1930s the wristwatch had almost completely supplanted the pocket watch.",
            price:1999.9

        }
    }
    
    componentDidMount(){
        if(this.props.skuId){
            var successAction=(result)=>{
                this.setState({
                    skuId:this.props.skuId,
                    itemName:"",
                    itemDesc:"",
                    skuName:"",
                    price:1999.9
                })
            }
            // this.get("/graph/getProject?projectId="+this.props.match.params.pid,successAction)
        }
    }

    handleLength=(content,len)=>{
        if(content&&content.length>len){
            return content.slice(0,len-1)+"..."
        }
        return content
    }

    render(){
        const {skuId, itemName, itemDesc, skuName, price} = this.state
        return (
            <Button style={styles.container} type="link">
                <Row type='flex' justify='start' style={{marginTop:40,fontSize:18,width:"100%"}}>
                    <Title level={3}>Order Detail</Title>
                    <Divider  style={{margin:0}}/>
                    <Row type="flex" justify="center" style={styles.container2}>

                        <Col span={2} >
                            <Row style={styles.courseItem}>SkuId</Row>
                            <Typography style={styles.content}>
                                {skuId}
                            </Typography>
                        </Col>

                        <Col span={6} >
                            <Row style={styles.courseItem}>Product Name</Row>
                            <Typography style={styles.content}>
                                {itemName}
                            </Typography>
                        </Col>

                        <Col span={9} >
                            <Row style={styles.courseItem}>Description</Row>
                            <Typography style={styles.content}>
                                {this.handleLength(itemDesc,40)}
                            </Typography>
                        </Col>

                        <Col span={3}>
                            <Row style={styles.courseItem}>Type</Row>
                            <Typography style={styles.content}>
                                {skuName}
                            </Typography>
                        </Col>
                        <Col span={4}>
                            <Row style={styles.courseItem}>Price</Row>
                            <Typography style={styles.content}>
                                {"￥"+price}
                            </Typography>
                        </Col>
                        <Divider style={{marginTop:10,marginBottom:0}}/>
                    </Row>
                </Row>
            </Button>
        );
    }
}

const styles = {
    container:{
        width:"100%",
        height: '60px',
        margin:0,
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

