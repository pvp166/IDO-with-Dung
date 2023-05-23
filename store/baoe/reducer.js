import {walletActionTypes as baoeActionTypes} from "../wallet/action";

const baoeInitState = {
    showLoading: false,
    showModalDeposit: false,
    showModalWithDraw: false,
}


export default function reducer(state = baoeInitState, action) {
    switch (action.type) {
        case baoeActionTypes.WITHDRAW:
            return Object.assign({}, state, {
                showLoading: action.showLoading,
                showSuccess: action.showSuccess
            })
        default:
            return state
    }
}