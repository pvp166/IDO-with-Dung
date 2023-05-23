import getContractInstance from '../../lib/getContract';
import getWeb3 from '../../lib/getWeb3';
import preIdo from '../../abis/preIdo.json';
import privateJson from '../../abis/private.json';
import BUSD from '../../abis/busd.json';

import Web3 from 'web3'
import ApiRest from "../../adapt/api/api_rest";
import {walletActionTypes} from "../wallet/action";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig()

export const contractActionTypes = {
    CONTRACT: 'CONTRACT',
    LOADING: 'LOADING',
    DONE: 'DONE'
}


export const buyIDO = ({price, BUSDAddress, idoReceiveAddress}) => async (dispatch) => {

    const Web3EthContract = require('web3-eth-contract');

    const web3 = window.ethereum ? new Web3(window.ethereum) : null;

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    price = (price.split('.')[0])

    let busdAddress = BUSDAddress ? BUSDAddress : "0x007b690262fbc673c56d4db629e161013b2a6802";

    let tokenInst = new web3.eth.Contract(BUSD, busdAddress);

    let receiveAddress = idoReceiveAddress ?  idoReceiveAddress : "0x727409884a349815d15D1047FB79c27850fe005F";

    tokenInst.methods
        .transfer(
            receiveAddress ,web3.utils.toWei(price, "ether")
        )
        .send({ from: account })
        .on("receipt", async (hash) => {
            console.log(hash)
            console.log(hash.transactionHash)
            console.log('call alert api')
            let options = {
                method: 'POST',
                prefix: 'ddapp/public-sale/deposit',
                usingHeaders: true
            }
            let params = {
            }

            let data = new FormData();
            data.append('hash',  hash.transactionHash);
            let res = await ApiRest({options: options, data: data, params: params});
            return dispatch({
                type: contractActionTypes.CONTRACT,
                contract: tokenInst,
                showLoading: false,
                showSuccess: true
            });
        })
        .on("error", (error) => {
            console.log(error)
            return dispatch({
                type: contractActionTypes.CONTRACT,
                contract: tokenInst,
                showSuccess: false,
                showLoading: false,
            });
        });

    // return dispatch({
    //     type: contractActionTypes.CONTRACT,
    //     contract: privateInst,
    //     approved: false,
    //     done: false
    // });
}

export const buyPrivateSale = ({price, BUSDAddress, idoReceiveAddress}) => async (dispatch) => {

    const Web3EthContract = require('web3-eth-contract');

    const web3 = window.ethereum ? new Web3(window.ethereum) : null;

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    price = (price.split('.')[0])

    let busdAddress = BUSDAddress ? BUSDAddress : "0x007b690262fbc673c56d4db629e161013b2a6802";

    let tokenInst = new web3.eth.Contract(BUSD, busdAddress);

    let receiveAddress = idoReceiveAddress ?  idoReceiveAddress : "0x727409884a349815d15D1047FB79c27850fe005F";

    tokenInst.methods
        .transfer(
            receiveAddress ,web3.utils.toWei(price, "ether")
        )
        .send({ from: account })
        .on("receipt", async (hash) => {
            console.log(hash)
            console.log(hash.transactionHash)
            console.log('call alert api')
            let options = {
                method: 'POST',
                prefix: 'ddapp/private-sale/pay-alert',
                usingHeaders: true
            }
            let params = {
            }

            let data = new FormData();
            data.append('hash',  hash.transactionHash);
            let res = await ApiRest({options: options, data: data, params: params});
            return dispatch({
                type: contractActionTypes.CONTRACT,
                contract: tokenInst,
                showLoading: false,
                showSuccess: true
            });
        })
        .on("error", (error) => {
            console.log(error)
            return dispatch({
                type: contractActionTypes.CONTRACT,
                contract: tokenInst,
                showSuccess: false,
                showLoading: false,
            });
        });

    // return dispatch({
    //     type: contractActionTypes.CONTRACT,
    //     contract: privateInst,
    //     approved: false,
    //     done: false
    // });
}

export const setSuccess = ({state}) => async (dispatch) => {
    return dispatch({
        type: contractActionTypes.DONE,
        showSuccess: state
    });
}

export const setLoading = ({state}) => async (dispatch) => {
    return dispatch({
        type: contractActionTypes.LOADING,
        showLoading: state
    });
}

// export const testEnv = () => {
//     let idoAddress = publicRuntimeConfig.PRIVATE_SALE_ADDRESS ? publicRuntimeConfig.PRIVATE_SALE_ADDRESS : "0xcB7C41D813463001d94a5c270b1579317a6cE2b0";
//     console.log("idoAddress :" + idoAddress)
// }


