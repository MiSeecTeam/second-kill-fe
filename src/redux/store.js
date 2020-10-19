import { createStore } from 'redux';
import rootReducer from './rootReducer';

const preloadedState = {

    identityReducer: {
        user: null,
        admin:null,
        sales:null
    },drawerReducer:{
        loading:false,
        closing:false,
        inner:false,
        title:"",
        content:null
    },modalReducer:{
        signInVisible:false,
        signUpVisible:false,
        onCancel: null
    }

}


const store = createStore (
    rootReducer,
    preloadedState
);

export default store;
