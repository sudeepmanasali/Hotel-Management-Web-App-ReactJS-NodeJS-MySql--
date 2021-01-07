export const initialState = {
    user:null,

    user_details:{}
}

export const actionTypes = {
    SET_USER: "SET_USER",
    LOGOUT:"LOGOUT",
    USER_INFO: "USER_INFO"
};

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.SET_USER:
            return{
                ...state,
                user:action.user,
            };
            case actionTypes.LOGOUT:
                return{
                    ...state,
                    user:null,
                };    
         
        case actionTypes.USER_INFO:
                return{
                    ...state,
                    user_details:action.user_details,
                };    


        default: 
          return state;    
    }
}

export default reducer;