
export const initialState = {
    
    user:localStorage.getItem('userId'),
    token:localStorage.getItem("token"),
    user_details:JSON.parse(localStorage.getItem("details")),
    isAuth : localStorage.getItem('isAuth'),
    currentBooking:null
}

export const actionTypes = {
    SET_USER: "SET_USER",
    LOGOUT:"LOGOUT",
    USER_INFO: "USER_INFO",
    BOOK_HOTEL: "BOOK_HOTEL",

};

const reducer = (state, action) => {
  
    switch (action.type) {
        case actionTypes.SET_USER:
            return{
                ...state,
                user:action.user,
                token:action.token,
                isAuth:action.isAuth
            };
            case actionTypes.LOGOUT:
                return{
                    ...state,
                    user:null,
                    isAuth:false
                };    
         
        case actionTypes.USER_INFO:
                return{
                    ...state,
                    user_details:action.user_details,
                };  
        
                case actionTypes.BOOK_HOTEL:
                    console.log(action);
                    return{
                        ...state,
                        currentBooking:action.currentBooking,
                    };         


        default: 
          return state;    
    }
}

export default reducer;