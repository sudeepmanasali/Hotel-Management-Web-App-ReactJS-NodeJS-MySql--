export const initialState = {
    // user:null,
    admin:null,
    hotel_details:{}
}

export const actionTypes = {

    SET_ADMIN:"SET_ADMIN",
    LOGOUT:"LOGOUT"
   
};

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
       
        case actionTypes.SET_ADMIN:
                return{
                    ...state,
                    admin:action.admin,
                };    
     
        case actionTypes.LOGOUT:
                    return{
                        ...state,
                        admin:null,
                    };    
         
    
        default: 
          return state;    
    }
}

export default reducer;