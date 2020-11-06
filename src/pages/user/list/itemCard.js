import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Row, Col, Typography, Skeleton, Rate, Divider, Radio, Button } from 'antd';
import {withRouter} from "react-router-dom";

import {Card,CardActionArea,CardActions} from '@material-ui/core';
import watchImg300 from './resource/1.jpg';

const { Text, Title } = Typography;
class ItemCard extends BaseComponent {
    constructor(props){
        super(props);
        this.state={
            skus:[],
            skuId:-1
        }
    }

    componentDidMount(){
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
    
    onClick=()=>{
        this.props.history.push("/user/detail/"+this.props.itemId)
    }


    render(){
        return (
            
            <Card elevation={6} style={styles.container} onClick={this.onClick}>
                <CardActionArea>
                <Row type="flex" justify="center"  style={{padding:20}}>
                    <img  style={styles.poster} src={watchImg300} />
                    
                    <Row style={styles.container3} type='flex' justify='start'>
                        <Text style={{fontSize:24}} type="danger">{"￥"+this.props.price}</Text>
                    </Row>
                    <Row style={styles.container3} type='flex' justify='end'>
                        <Text style={{fontSize:18}} >{"0人已付款"}</Text>
                    </Row>
                    <Row style={styles.container2} type='flex' justify='start'>
                        <Text style={{fontSize:18}} >{this.props.itemName}</Text>
                    </Row>
                </Row>
                </CardActionArea>
            </Card>
        );
    }
}

const styles = {
    container:{
        width:300,
        margin:20
    },
    img:{
        height:270,
        width:270
    },
    container2:{
        marginLeft:0,
        width:"100%"
    },
    container3:{
        marginLeft:0,
        width:"50%"
    },
    btn:{
        width:100,
        height:50,
        fontSize:18,
        margin:20,
        marginLeft:0
    },
    poster:{
        objectFit: "cover",
        position:"relative",
        width:"100%",
        borderRadius:5,
    },
}

export default withRouter(ItemCard);
