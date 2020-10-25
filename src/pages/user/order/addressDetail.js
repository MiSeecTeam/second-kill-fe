import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Row, Col,Input, Typography, Skeleton, Button,Cascader,Divider } from 'antd';


const { Text, Title } = Typography;
export default class AddressDetail extends BaseComponent {
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
        const options = [
            {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
                {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                    },
                ],
                },
            ],
            },
        ];
        return (
            <Row type='flex' justify='start' style={{marginTop:40,marginBottom:40,fontSize:18,width:"100%"}}>
                <Title level={3}>Address Info</Title>
                <Divider  style={{margin:0}}/>
                <Row type="flex" justify="start"  style={{width:"40%",margin:10}}>
                    <Text>Receiver Name</Text>
                    <Input  placeholder="John Wick" size="large" ></Input>
                </Row>
                <Row type="flex" justify="start"  style={{width:"40%",margin:10}}>
                    <Text>Telephone Number</Text>
                    <Input  placeholder="11451419810" size="large" ></Input>
                </Row>
                <Row type="flex" justify="start"  style={{width:"90%",margin:10}}>
                    <Text>County / City / Borough</Text>
                    <Input.Group size="large" compact>
                        <Cascader style={{ width: '100%' }} options={options} placeholder="Select Address" />
                    </Input.Group>
                </Row>
                <Row type="flex" justify="start"  style={{width:"90%",margin:10}}>
                    <Text>Full Address</Text>
                    <Input  placeholder=" 910 42TH STREET 1FL BROOKLYN NEW YORK N.Y 11219" size="large" ></Input>
                </Row>
            </Row>
        );
    }
}

const styles = {
    container:{
        marginTop:"40px",
    },
    container2:{
        width:"100%",
        height: '60px',
        margin:10,
        padding:3,
        border:0
    },
    content:{
        marginTop:10,
        padding:10
    }
}

