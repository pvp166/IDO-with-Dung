import BAOE from '../../abis/baoe.json';
import Web3 from 'web3'
import ApiRest from "../../adapt/api/api_rest";
import {contractActionTypes} from "../contract/action";

const baoeActionTypes =  {
    WITHDRAW: 'WITHDRAW',
    DEPOSIT: 'DEPOSIT',
    SHOW_MODAL_DEPOSIT: 'SHOW_MODAL_DEPOSIT',
    SHOW_MODAL_WITHDRAW: 'SHOW_MODAL_WITHDRAW'
}

const TokenAddress = "0x02Dc28b3191D2E779294057f483783d4922d6216"
const IdoAddress = "0xe9e468e27273334C8322011a9056dAc969E13e38";


export const withdraw = ({price}) => async (dispatch) => {

    let options = {
        method: 'POST',
        prefix: ' /ddapp/account/withdraw',
        usingHeaders: true
    }
    let params = {
    }

    let data = new FormData();
    data.append('amount',  price);
    let res = await ApiRest({options: options, data: data, params: params});
    if(res.status) {
        return dispatch({
            type: contractActionTypes.CONTRACT,
            showLoading: false,
            showSuccess: true
        });
    } else {
        return dispatch({
            type: contractActionTypes.CONTRACT,
            showLoading: false,
            showSuccess: false
        });
    }
}

export const deposit = ({price}) => async (dispatch) => {
    const Web3EthContract = require('web3-eth-contract');
    const web3 = window.ethereum ? new Web3(window.ethereum) : null;
    const networkId = await web3.eth.net.getId()
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    let Instance = new web3.eth.Contract(BAOE, TokenAddress);

    Instance.methods
        .transfer(
            IdoAddress,web3.utils.toWei(price, "ether")
        )
        .send({ from: account })
        .on("receipt", (hash) => {
            console.log(hash);
            return dispatch({
                type: baoeActionTypes.DEPOSIT,
                showLoading: false,
                showSuccess: true
            });
        })
        .on("error", (error) => {
            console.log(error)
            return dispatch({
                type: baoeActionTypes.DEPOSIT,
                showLoading: false,
                showSuccess: false
            });
        });
}

export const loadingAction = ({state}) => (dispatch) => {
    return dispatch({
        showLoading: state,
        showSuccess: false
    });
}

export const setShowModalDeposit = ({state}) => (dispatch) => {
    return dispatch({
        showLoading: false,
        setShowModalDeposit: state
    });
}

export const setShowModalWithDraw = ({state}) => (dispatch) => {
    return dispatch({
        showLoading: false,
        setShowModalDeposit: state
    });
}