import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Row, Col, AutoComplete } from 'antd';
import ItemCard from './itemCard'

export class ItemList extends BaseComponent {

    constructor(props){
        super(props);
        this.state={
            itemList:[]
        }
    }

    componentDidMount(){
        
        var successAction = (result) => {
            if(result.success){
                this.setState({itemList:result.content})
            }else{
                this.pushNotification("danger", "Loading Item list failed");
            }
        }
        
        this.get('/item/listItems', successAction);
    }


    renderVirtualItem=()=>{
        return(
            <ItemCard 
                itemName="Wristwatch by Ted Baker London" 
                itemDesc="By the 1930s the wristwatch had almost completely supplanted the pocket watch."
                price={1999.8}/>
        )
    }


    renderItem=(item)=>{
        return(
            <ItemCard 
                itemId={item.itemId}
                itemName={item.itemName}
                itemDesc={item.itemDesc}
                price={1999.9}/>
        )
    }

    render(){
        console.log(this.state.itemList)
        return (
            <Row style={styles.container}>
                
                <Row id="listStart" type='flex' justify='center'>
                    <Col xs={22} sm={20} lg={18}>
                        <h2 style={styles.titles}>Item List</h2>
                    </Col>
                </Row>
                <Row  type='flex' justify='center'>
                    <Col xs={22} sm={20} lg={18}>
                        <Row  type='flex' justify='start'>
                            {this.state.itemList.map(this.renderItem)}
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

