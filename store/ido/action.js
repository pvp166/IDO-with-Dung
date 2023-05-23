import ApiRest from "../../adapt/api/api_rest";

export const idoActionTypes = {
    GET_INFO: 'GET_INFO',
    GET_IDO_INFO: 'GET_IDO_INFO',
}

export const getIdoInfo = () => async (dispatch) => {

    let  jwt = JSON.parse(localStorage.getItem('jwt'))
    let options = {
        method: 'GET',
        prefix: 'ddapp/public-sale/info',
        usingHeaders: !!jwt
    }
    let params = {
    }

    let res = await ApiRest({options, params});

    if (res.status) {
        return dispatch({
            type: idoActionTypes.GET_INFO,
            totalRaise: res.payload.totalRaise,
            totalPeopleRaise: res.payload.totalPeopleRaise,
            mineRaise: res.payload.mineRaise,
            idoUserMax: res.payload.idoUserMax,
            idoTxtTime: res.payload.idoTxtTime,
            idoRound: res.payload.idoRound,
            idoPool1: res.payload.idoPool1,
            idoPool2: res.payload.idoPool2,
            idoEndtime: res.payload.idoEndtime,
            isIdoWhitelist: res.payload.isIdoWhitelist,
            mineBoughtRound1: res.payload.mineBoughtRound1 ? res.payload.mineBoughtRound1 : 0,
            mineBoughtRound2: res.payload.mineBoughtRound2 ? res.payload.mineBoughtRound2 : 0,
            mineBoughtRound3: res.payload.mineBoughtRound3 ? res.payload.mineBoughtRound3 : 0,
            totalPeopleRaiseRound1: res.payload.totalPeopleRaiseRound1 ? res.payload.totalPeopleRaiseRound1 : 0,
            totalPeopleRaiseRound2: res.payload.totalPeopleRaiseRound2 ? res.payload.totalPeopleRaiseRound2 : 0,
            totalPeopleRaiseRound3: res.payload.totalPeopleRaiseRound3 ? res.payload.totalPeopleRaiseRound3 : 0,
            idoCountdown: res.payload.idoCountdown,
        });
    } else if (!res.status && res.stateCode === 401) {
        return dispatch({
            type: idoActionTypes.GET_INFO,
            totalRaise: res.payload.totalRaise,
            totalPeopleRaise: res.payload.totalPeopleRaise,
            mineRaise: res.payload.mineRaise,
            idoUserMax: res.payload.idoUserMax,
            idoTxtTime: res.payload.idoTxtTime,
            idoRound: res.payload.idoRound,
            idoPool1: res.payload.idoPool1,
            idoPool2: res.payload.idoPool2,
            idoEndtime: res.payload.idoEndtime,
            isIdoWhitelist: res.payload.isIdoWhitelist,
            mineBoughtRound1: res.payload.mineBoughtRound1 ? res.payload.mineBoughtRound1 : 0,
            mineBoughtRound2: res.payload.mineBoughtRound2 ? res.payload.mineBoughtRound2 : 0,
            mineBoughtRound3: res.payload.mineBoughtRound3 ? res.payload.mineBoughtRound3 : 0,
            idoCountdown: res.payload.idoCountdown,
            totalPeopleRaiseRound1: res.payload.totalPeopleRaiseRound1,
            totalPeopleRaiseRound2: res.payload.totalPeopleRaiseRound2,
            totalPeopleRaiseRound3: res.payload.totalPeopleRaiseRound3,
        });
    }
}

export const getIdoAddress = () => async  (dispatch) => {

    let options = {
        method: 'GET',
        prefix: 'ddapp/eth',
        usingHeaders: false
    }

    let params = {
    }

    let res = await ApiRest({options, params});

    if(res.status) {
        return dispatch({
            type: idoActionTypes.GET_IDO_INFO,
            contractAddressBUSD: res.payload.eth.busd_address,
            receiverBUSD: res.payload.eth.busd_receive,
        });
    }
}


