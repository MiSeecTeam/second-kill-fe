import React,{ Component } from 'react';
import {Row,Col,Button, Divider} from 'antd';
import BannerAnim, { Element,Thumb } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import BaseComponent from '../../BaseComponent'
import 'rc-banner-anim/assets/index.css';
import back from './resource/back.jpeg'

const BgElement = Element.BgElement;
var count=0;
class BaseBanner extends BaseComponent {

    constructor(props){
        super(props);
    };

    renderButton=(button)=>{
        const {icon,text,onClick,href}=button
        return(
            <Button 
            type="primary"
            style={styles.button} 
            icon={icon} 
            size="large" 
            onClick={onClick}
            href={href}
            ghost>
                {text}
            </Button>
        )
    }

    renderGradient=()=>{
        if(this.props.index==0)
            return(
                <TweenOne
                animation={{ y: 30, opacity: 0, type: 'from' }}
                style={styles.gradient}
                >
                    <div style={{
                    height:"300px",
                    backgroundImage:"linear-gradient(rgba(0,0,0,0),rgba(255,255,255,1))"}}/>
                </TweenOne>
            )
    }

    render(){
        return(
            <BannerAnim 
            ref={(c) => { this.props.getBanner(c); }}
            type="vertical"
            style={{height:'800px'}}
            arrow={false}
            dragPlay={false}
            autoPlay={true}
            autoPlaySpeed={5000}>
                {this.renderElement()}
            </BannerAnim>
        )
    }

    renderElement=()=>{
        count++;
        return(
            <Element 
            style={styles.element}
            key={count+""}
            prefixCls="banner-user-elem"
            followParallax={{
                delay: 500,
                data: [
                { id: 'bg'+count, value: 20, bgPosition: '50%', type: ['backgroundPositionX'] },
                ],
            }}
            >
                {this.renderGradient()}
                <BgElement
                key={"bg"+count}
                style={{
                ...{backgroundImage: `url(${back})`},
                ...styles.bg
                }}
                id={"bg"+count}
                />

                <TweenOne
                animation={{ y: 30, opacity: 0, type: 'from' }}
                id="title"
                style={styles.title}
                >
                    GD.COM
                </TweenOne>

                <TweenOne
                animation={{ y: 30, opacity: 0, type: 'from',delay:150 }}
                id="title"
                style={styles.title}
                >
                    Second Killing Site
                </TweenOne>

                <TweenOne
                animation={{ y: 30, opacity: 0, type: 'from',delay:300 }}
                id="title2"
                style={styles.title2}
                >
                    <Col lg={14} sm={24}>
                        Consumerism is the selfish and frivolous collecting of products, or economic materialism. 
                    </Col>
                    <Col lg={10} sm={24}>
                        <Row type="flex" justify="end">
                            -Anonymous
                        </Row>
                    </Col>
                </TweenOne>
    
                <TweenOne
                animation={{ y: 30, opacity: 0, type: 'from',delay:300 }}
                id="title2"
                style={styles.title2}
                >
                    <Divider style={{width:"50%"}}/>
                </TweenOne>

                
                
            </Element>
        )
    }
}

const styles={
    element:{
        textAlign: "start",
        color: "white",
        position: "relative",
    },
    gradient:{
        position:'absolute',
        top:"700px",
        height:"100px",
        left:0,
        right:0,
        zIndex:5
    },
    bg:{
        position:'absolute',
        top:0,
        left:-100,
        right:-100,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height:'800px'
    },
    title:{
        fontSize: "45px",
        top: "15%",
        left: "20%",
        fontFamily:"Georgia"
    },
    title2:{
        fontSize:"27px",
        top: "15%",
        left: "20%",
        fontFamily:"Georgia",
        width:"50%"
    },
    bar:{
        zIndex:6,//浮于渐变之上
        top: "15%",
        width:'50%',
        left: "20%",
    }
}

export default BaseBanner;