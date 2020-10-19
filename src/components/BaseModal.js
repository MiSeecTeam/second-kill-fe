import React from 'react';
import {withRouter} from "react-router-dom";
import { Modal } from 'antd';
import { BaseComponent } from '../BaseComponent';
import SignIn from './signIn'
import SignUp from './signUp'
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    signInVisible:state.modalReducer.signInVisible,
    signUpVisible:state.modalReducer.signUpVisible,
    onCancel:state.modalReducer.onCancel,
})

class baseModal extends BaseComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
        <Modal
        title={null}
        visible={visible}
        closable={false}
        footer={null}
        destroyOnClose={true}
        >
            {this.props.content}
        </Modal>
        );
    }

}


const styles={

};

export default (connect(mapStateToProps)(withRouter(authModal)))

