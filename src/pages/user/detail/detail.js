import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Row, Col, AutoComplete, Skeleton, Button,Tabs } from 'antd';
import ReactImageMagnify from 'react-image-magnify';
import DetailCard from './detailCard'

import watchImg300 from './resource/wristwatch_355.jpg';
import watchImg1200 from './resource/wristwatch_1200.jpg';


const { TabPane } = Tabs;
export class ItemDetail extends BaseComponent {
    constructor(props){
        super(props);
        this.state={
            isLoading:true,
            item:{},
            price:"-"
        }
    }

    componentDidMount(){
        
        let form = new FormData();
        form.append('itemId', this.props.match.params.itemId);
        
        var successAction = (result) => {
            this.setState({item:result.content,isLoading:false})
        }

        var unsuccessAction = (result) => {
            this.pushNotification("danger", result.message);
        }

        this.post("/item/getItem", form, successAction, unsuccessAction)
    }

    renderCard=()=>{
        const item = this.state.item
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
                    <Row type='flex' justify='start' style={{marginTop:30}} >
                        <DetailCard 
                        itemId={item.itemId}
                        itemName={item.itemName}
                        itemDesc={item.itemDesc}
                        setPrice={this.setPrice}/>
                    </Row>
                </Col>
            )
        }
    }

    render(){
        return (
            <Row style={styles.container}>
                <Row type='flex' justify='center'>
                    <Col xs={12} sm={12} lg={8} style={{zIndex:10}}>
                        <Row type='flex' justify='center'>
                            <ReactImageMagnify {...{
                                smallImage: {
                                    alt: 'Wristwatch by Ted Baker London',
                                    isFluidWidth: true,
                                    src: watchImg300
                                },
                                largeImage: {
                                    src: watchImg1200,
                                    width: 600,
                                    height: 900
                                }
                            }} />
                        </Row>
                    </Col>
                    {this.renderCard()}
                </Row>
                <Row style={{marginTop:200}} type='flex' justify='center'>
                    <Col xs={24} sm={24} lg={18}>
                        <Tabs defaultActiveKey="1" centered="true">
                            <TabPane tab="Product Details" key="1">
                                Product Details
                            </TabPane>
                            <TabPane tab="Customer Reviews" key="2">
                                Customer Reviews
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </Row>
        );
    }
}

const styles = {
    container:{
        marginTop:"20px"
    }
}

