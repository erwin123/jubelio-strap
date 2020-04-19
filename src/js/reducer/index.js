import { ADD_PRODUCT } from "../constant";
const initialState = {
    Products: []
};

function rootReducer(state = initialState, action) {
    console.log(action.type);
    if (action.type === ADD_PRODUCT) {
        return Object.assign({}, state, {
            Products: state.Products.concat(action.payload)
        });
    }
    return state;
}

export default rootReducer;