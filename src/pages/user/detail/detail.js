import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Row, Col, AutoComplete, Skeleton } from 'antd';
import ReactImageMagnify from 'react-image-magnify';
import DetailCard from './detailCard'

import watchImg300 from './resource/wristwatch_355.jpg';
import watchImg1200 from './resource/wristwatch_1200.jpg';


export class ItemDetail extends BaseComponent {
    constructor(props){
        super(props);
        this.state={
            isLoading:true
        }
    }

    componentDidMount(){
        this.timeout(700).then(()=>{
            this.dispDetail()
        })
    }

    dispDetail(){
        this.setState({isLoading:false})
    }

    renderCard(){
        if(this.state.isLoading){
            return (
                <Col xs={12} sm={12} lg={8} style={{zIndex:1}}>
                    <Row type='flex' justify='start' style={{marginTop:30}} >
                        <Skeleton active paragraph={{ rows: 4 }} />
                        <Skeleton active paragraph={{ rows: 7 }} />
                    </Row>
                </Col>
            )
        }else{
            return (
                <Col xs={12} sm={12} lg={8} style={{zIndex:1}}>
                    <Row type='flex' justify='start' style={{marginTop:30}} >
                        <DetailCard 
                        itemName="Wristwatch by Ted Baker London" 
                        itemDesc="By the 1930s the wristwatch had almost completely supplanted the pocket watch."/>
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
                                    width: 1200,
                                    height: 1800
                                }
                            }} />
                        </Row>
                    </Col>
                    {this.renderCard()}
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

