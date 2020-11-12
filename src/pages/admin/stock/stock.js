import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Row, Col, Button, Select, Descriptions, Badge, Typography } from 'antd';
import Amount from './amount'
import AddItemModal from './addItemModal'
import AddSkuModal from './addSkuModal'
export class Stock extends BaseComponent {
    constructor(props){
        super(props);
        this.state={
            items:[],
            addVis:false,
            addVis2:false,
            itemId:-1
        }
    }

    onFresh=()=>{
        var successAction = (result) => {
            this.setState({items:result.content})
        }

        var unsuccessAction = (result) => {
            this.pushNotification("danger", result.message);
        }

        this.get("/item/all", successAction, unsuccessAction)
    }
    
    addCancel=()=>{
        this.setState({
          addVis:false,
          addVis2:false
        })
    }
    
    addShow=()=>{
        this.setState({
          addVis:true
        })
    }


    componentDidMount(){
        this.onFresh();
    }

    renderSku=(item)=>{
        const killing = true?"Killing":"Normal";
        return(
            <Descriptions bordered>
                <Descriptions.Item label="Sku Id" span={1}>{item.skuId}</Descriptions.Item>
                <Descriptions.Item label="Sku Name" span={2}>{item.skuName}</Descriptions.Item>
                <Descriptions.Item label="Description" span={3}>{item.skuDesc}</Descriptions.Item>
                <Descriptions.Item label="price">{item.skuPrice}</Descriptions.Item>
                <Descriptions.Item label="Status" span={3}>
                    <Badge status="processing" text={killing} />
                </Descriptions.Item><Descriptions.Item label="Amount" span={3}>
                    {this.renderAmount(item.skuId,item.amount)}
                </Descriptions.Item>
                                
            </Descriptions>
        )
    }

    renderAmount=(skuId,amount)=>{
        return(
            <Amount skuId={skuId} amount={amount} refresh={this.onFresh}/>
        )
    }
    

    addSku=(itemId)=>{
        this.setState({
            addVis2:true,
            itemId:itemId
        })
    }

    deleteItem=(itemId)=>{
        let form = new FormData();
        form.append('itemId', itemId);

        var successAction = (result) => {
            this.onFresh()
        }

        var unsuccessAction = (result) => {
            this.pushNotification("danger", result.message);
        }

        this.post("/item/deleteItem",form, successAction, unsuccessAction)
    }

    renderItem=(item,index)=>{
        return(
            <Col span={24}>
                <Row style={{margin:20}} type="flex" justify="center">
                    <Descriptions bordered>
                        <Descriptions.Item label="Product Id" span={1}>{item.itemId}</Descriptions.Item>
                        <Descriptions.Item label="Product Name" span={2}>{item.itemName}</Descriptions.Item>
                        <Descriptions.Item label="Description" span={3}>{item.itemDesc}</Descriptions.Item>
                        <Descriptions.Item label="Update time" span={2}>{item.gmtModified}</Descriptions.Item>
                        <Descriptions.Item label="Create Time" span={1}>
                            {item.gmtCreated}
                        </Descriptions.Item>
                        <Descriptions.Item label="Sku List" span={3}>
                            {item.skuDetailList.map(this.renderSku)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Operation" span={3}>
                            <Button type="primary"  onClick={()=>{this.addSku(item.itemId)}} 
                                style={{marginRight:40}}>AddSku</Button>
                            <Button type="danger" onClick={()=>{this.deleteItem(item.itemId)}}>Delete</Button>
                        </Descriptions.Item>
                    </Descriptions>
                </Row>
            </Col>
        )
    }

    render(){
        return (
            <Row style={styles.container} type="flex" justify="center">
                <Col span={14}>
                    <Row type="flex" justify="end" style={{marginRight:100}}>
                        <Button type="primary" onClick={this.addShow}>
                            Add Item
                        </Button>
                    </Row>
                </Col>
                {this.state.items.map(this.renderItem)}
                <AddItemModal visible={this.state.addVis} onCancel={this.addCancel}/>
                <AddSkuModal visible={this.state.addVis2} onCancel={this.addCancel} itemId={this.state.itemId}/>
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

