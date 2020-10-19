import React from "react";
import BaseComponent from '../../../components/BaseComponent'
import { Row, Col, Typography, Skeleton } from 'antd';


const { Text, Title } = Typography;
export default class DetailCard extends BaseComponent {
    render(){
        return (
            <Row style={styles.container}>
                <Title level={3}>{this.props.itemName}</Title>
                <Text type="danger">{this.props.itemDesc}</Text>
            </Row>
        );
    }
}

const styles = {
    container:{
    }
}

