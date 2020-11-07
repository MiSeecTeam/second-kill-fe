import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Row, Col, Button, InputNumber } from 'antd';

export default class Amount extends BaseComponent {
    constructor(props){
        super(props);
        this.state={
            amount:this.props.amount,
        }
    }

    onClick=()=>{
        let form = new FormData();
        form.append('skuId', this.props.skuId);
        form.append('amount', this.state.amount);
        var successAction = (result) => {
            this.pushNotification("success", result.message);
            this.props.refresh();
        }

        var unsuccessAction = (result) => {
            this.pushNotification("danger", result.message);
        }

        this.post("/item/modifySku",form, successAction, unsuccessAction)
    }

    onChange=(value)=>{
        this.setState({amount:value})
    }

    render(){ 
        if(this.state.amount==this.props.amount)
            return(
                <Row>
                    <InputNumber value={this.state.amount} onChange={this.onChange}/>
                </Row>
            )
        else{
            return(
                <Row>
                    <InputNumber value={this.state.amount} onChange={this.onChange}/>
                    <Button onClick={this.onClick} type="primary" style={{marginLeft:20}}>Update</Button>
                </Row>
            )
        }
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

