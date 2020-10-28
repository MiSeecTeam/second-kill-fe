import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Row, Col, AutoComplete } from 'antd';
import ItemCard from './itemCard'

export class ItemList extends BaseComponent {

    renderItem=()=>{
        return(
            <ItemCard 
                itemName="Wristwatch by Ted Baker London" 
                itemDesc="By the 1930s the wristwatch had almost completely supplanted the pocket watch."
                price={1999.8}/>
        )
    }

    render(){
        return (
            <Row style={styles.container}>
                
                <Row id="listStart" type='flex' justify='center'>
                    <Col xs={22} sm={20} lg={18}>
                        <h2 style={styles.titles}>商品列表</h2>
                    </Col>
                </Row>
                <Row  type='flex' justify='center'>
                    <Col xs={22} sm={20} lg={18}>
                        <Row  type='flex' justify='start'>
                            {this.renderItem()}
                            {this.renderItem()}
                            {this.renderItem()}
                        </Row>
                    </Col>
                </Row>
            </Row>
        );
    }
}

const styles = {
    container:{
        marginTop:"100px"
    }
}

