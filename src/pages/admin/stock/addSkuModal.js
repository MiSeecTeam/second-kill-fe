import React from 'react';
import {withRouter} from "react-router-dom";
import { Drawer,Input,Radio,Row, Col, Divider, Button, Icon, Form, Modal, InputNumber, DatePicker} from 'antd';
import { BaseComponent } from '../../../components/BaseComponent';
import {FormButton, FormText, FormSelector, FormTextNum} from '../../../components/forms';

const FormItem = Form.Item;

class AddSkuModal extends BaseComponent{
    constructor(props) {
        super(props);
        this.state={

        }
    }

    render=()=>{
        const { getFieldDecorator } = this.props.form;
        return(
            <Drawer
            title={<span><Icon type="plus-circle" />&emsp;Add Sku</span>}
            visible={this.props.visible}
            width={720}
            onClose={this.props.onCancel}
            >
                {this.renderContent()}
            </Drawer>
        )
    }

    renderContent=()=>{
        const { getFieldDecorator } = this.props.form;
        return(
            <Row type='flex' 
            justify='center' 
            align="middle" 
            style={{borderRadius:'20px'}}>
                <Col>
                    <Form onSubmit={this.handleSubmit}>

                        {/* <Row justify='center'></Row> */}
                        <Row gutter={16}>
                                <FormText form={this.props.form}
                                    label='Sku Id' 
                                    name='skuId' 
                                    required={true} 
                                    icon='table'>
                                </FormText>
                                <FormText form={this.props.form}
                                    label='Name' 
                                    name='skuName' 
                                    required={true} 
                                    icon='table'>
                                </FormText>
                                <FormText form={this.props.form}
                                    label='Price' 
                                    name='skuPrice' 
                                    required={true} 
                                    icon='table'>
                                </FormText>
                                <FormText form={this.props.form}
                                    label='Amount' 
                                    name='amount' 
                                    required={true} 
                                    icon='table'>
                                </FormText>
                                <FormItem label="Start Time">
                                    {getFieldDecorator('startTime', {
                                        rules: [{ required: true, message: 'Start Time Here' }],
                                    })(
                                        <DatePicker
                                            style={{ width: '100%' }}
                                            showTime={true}
                                            getPopupContainer={trigger => trigger.parentNode}
                                            placeholder='Start Time'
                                        />,
                                    )}
                                </FormItem>
                                <FormItem label="End Time">
                                    {getFieldDecorator('endTime', {
                                        rules: [{ required: true, message: 'End Time Here' }],
                                    })(
                                        <DatePicker
                                            style={{ width: '100%' }}
                                            showTime={true}
                                            getPopupContainer={trigger => trigger.parentNode}
                                            placeholder='End Time'
                                        />,
                                    )}
                                </FormItem>
                        </Row>
                        <Row gutter={16}>
                            <Form.Item label="Description">
                                {getFieldDecorator('skuDesc', {
                                    rules: [
                                    {
                                        required: true,
                                        message: 'Please Add Description',
                                    },
                                    ],
                                })(<Input.TextArea rows={4} placeholder="Item Description" />)}
                            </Form.Item>
                        </Row>

                        <div>
                        <span>&emsp;</span>
                        </div>
                        <Row type='flex' justify='center'>
                            <FormButton form={this.props.form} label="提交" style={styles.button}/>
                            <div>&emsp;&emsp;&emsp;&emsp;</div>
                            <Button style={styles.button2} onClick={this.props.onCancel}>
                                取消
                            </Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
        )
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            let form = new FormData();
            form.append('itemId', this.props.itemId);
            form.append('skuId', this.props.itemId+"0"+values.skuId);
            form.append('skuName', values.skuName);
            form.append('skuDesc', values.skuDesc);
            form.append('amount', values.amount);
            form.append('skuPrice', values.skuPrice);
            form.append('startTime', values.startTime);
            form.append('endTime', values.endTime);

            this.post('/item/addSku', form, (result) => {
                this.pushNotification("success", "Sku Added！");
                console.log(result.content);
                this.props.onCancel();
            })

        })
    }




}

FormText.defaultProps = {
    width:"250px",
    height:"40px"
}

const styles={
    
    logo: {
        height:'64px',
        width:'192px'
    },

    cardContainer:{
        width:'500px',
        marginTop:'10px'
    },

    button:{
        width:'150px',
        height:'40px',
    },

    button2:{
        width:'150px',
        height:'40px',
        color:'white',
        backgroundColor: '#CCCCCC',
        marginBottom:'20px'
    },

    welcome:{
        fontSize:25,
        marginLeft: '30px',
        marginRight: '10px',
        marginBottom: '3px',
    },
    welcome2:{
        fontSize:17,
        color:'#AAAAAA',
        marginLeft: '30px',
        marginRight: '10px',
        marginBottom: '10px',
    },

};

export default Form.create()(AddSkuModal)