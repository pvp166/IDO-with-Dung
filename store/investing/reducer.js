import {vestingActionTypes} from "./action";

const vestingInitialState = {
    fullName: null,
    email: null,
    packageNo: null,
    packageAmount: null,
    packageToken: null,
    inWhiteList: null,
    isTransfer: null,
    vestingInfo: []
}

export default function reducer (state = vestingInitialState, action) {
    switch (action.type) {
        case vestingActionTypes.VESTING:
            return Object.assign({}, state, {
                fullName: action.fullName,
                email: action.email,
                packageNo: action.packageNo,
                packageAmount: action.packageAmount,
                packageToken: action.packageToken,
                inWhiteList: action.inWhiteList,
                isTransfer: action.isTransfer,
                vestingInfo: action.vestingInfo
            })
        default:
            return state
    }
}
