import ApiRest from "../../adapt/api/api_rest";

export const vestingActionTypes = {
    VESTING: 'VESTING',
}

export const getVesting = () => async (dispatch) => {

    let options = {
        method: 'GET',
        prefix: 'ddapp/private-sale/vesting',
        usingHeaders: true
    }

    let params = {
    }

    let walletAddress = localStorage.getItem('walletAddress');

    if (walletAddress) {
        let res = await ApiRest({options});
        if(res.status) {
            console.log("wl :" + res.payload.inWhitelist);
            console.log("tf :" + res.payload.isTransfer);
            localStorage.setItem('psTransfer', JSON.stringify(res.payload.isTransfer));
            localStorage.setItem('psWhitelist', JSON.stringify(res.payload.inWhitelist));

            return dispatch({
                type: vestingActionTypes.VESTING,
                fullName: res.payload.fullName,
                email: res.payload.email,
                packageNo: res.payload.packageNo,
                packageAmount: res.payload.packageAmount,
                packageToken: res.payload.packageToken,
                inWhiteList: res.payload.inWhitelist,
                isTransfer: res.payload.isTransfer,
                vestingInfo: res.payload.vestingInfo
            });
        }
    }
}

export const removeVesting = () => async (dispatch) => {
    return dispatch({
        type: vestingActionTypes.VESTING,
        fullName: null,
        email: null,
        packageNo: null,
        packageAmount: null,
        packageToken: null,
        inWhiteList: null,
        isTransfer: null,
        vestingInfo: []
    });
}