var drawerReducer = (state = {}, action) => {

    switch (action.type) {

        case 'SHOWDRAWER':
            return { ...state, title:action.title,content: action.content, loading: true,closing:false,inner:false};
        
        case 'SHOWINNERDRAWER':
            return { ...state, title:action.title,content: action.content, loading: true,closing:false,inner:true};
    
        case 'RESETDRAWER':
            return { ...state, loading:false,closing:false,inner:false};

        case 'CLOSEDRAWER':
            return { ...state, loading:false,closing:true,inner:false };

        default:
            return state;
    }
}

export default drawerReducer;
