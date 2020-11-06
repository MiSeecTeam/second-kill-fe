import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Row, Col, Typography, Skeleton, Rate, Divider, Radio, Button } from 'antd';
import {withRouter} from "react-router-dom";


const { Text, Title } = Typography;
class DetailCard extends BaseComponent {
    constructor(props){
        super(props);
        this.state={
            isLoading:true,
            skus:[],
            skuId:-1
        }
    }

    componentDidMount(){
        this.timeout(1400).then(()=>{
            this.dispDetail()
        })
    }

    dispDetail(){
        const tempSkus=[{skuId:10001001,skuName:"Silver"},
            {skuId:10001002,skuName:"Black"},
            {skuId:10001003,skuName:"Golden"},
            {skuId:10001004,skuName:"Scarlet"}]
        this.setState({isLoading:false,skus:tempSkus})
    }

    onChangeSku=({ target: { value } })=>{
        this.setState({skuId:value})
    }

    mapSkuOption=(sku)=>{
        return(
            <Radio.Button style={styles.btn} value={sku.skuId}>
                <Row type='flex' justify='center' align="middle" style={{height:50}}>
                    {sku.skuName}
                </Row>
            </Radio.Button>
        )
    }
    
    renderSku(){
        if(this.state.isLoading){
            return (
                <Col xs={12} sm={12} lg={8} style={{zIndex:1}}>
                    <Row type='flex' justify='start' style={{marginTop:30}} >
                        <Skeleton active paragraph={{ rows: 4 }} />
                    </Row>
                </Col>
            )
        }else{
            return (
                <Col xs={12} sm={12} lg={8} style={{zIndex:1}}>
                    <Row type='flex' justify='start' style={{marginTop:30,width:600}} >
                        <Row type='flex' justify='start' style={{width:"100%"}}>
                            <Title level={4}>Type</Title>
                        </Row>
                        <Row type='flex' justify='start' style={{width:"100%"}}>
                            <Radio.Group onChange={this.onChangeSku} defaultValue="" buttonStyle="solid">
                                {this.state.skus.map(this.mapSkuOption)}
                            </Radio.Group>
                        </Row>
                        
                        <Row type='flex' justify='end' style={{width:"100%", marginTop:20}}>
                            <Button onClick={()=>{this.onClick(this.state.skuId)}} 
                                icon="shopping-cart" size="large" style={{fontSize:18}}>Buy now</Button>
                        </Row>
                    </Row>
                </Col>
            )
        }
    }
    
    onClick=(id)=>{
        this.props.history.push({pathname:"/user/orderplace/"+id,state:{id}})
    }


    render(){
        return (
            <Row style={styles.container}>
                <Row style={styles.container}>
                    <Title level={2}>{this.props.itemName}</Title>
                    <Text style={{fontSize:18}} type="danger">{this.props.itemDesc}</Text>
                </Row>
                <Row style={styles.container}>
                    <Rate disabled defaultValue={4.5}/>
                </Row>
                
                <Row style={styles.container2} type='flex' justify='start'>
                    <Title level={2}>{"￥"+this.props.price}</Title>
                </Row>
                <Divider style={{margin:0}}/>
                {this.renderSku()}
            </Row>
        );
    }
}

const styles = {
    container:{
        margin:10,
        marginLeft:0
    },
    container2:{
        marginTop:20,
        marginLeft:0
    },
    btn:{
        width:100,
        height:50,
        fontSize:18,
        margin:20,
        marginLeft:0
    }
}

export default withRouter(DetailCard);
