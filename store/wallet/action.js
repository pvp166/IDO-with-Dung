import getWeb3 from '../../lib/getWeb3';
import ApiRest from "../../adapt/api/api_rest";
import {removeVesting} from "../investing/action";

export const walletActionTypes = {
  WALLET: 'WALLET',
  VESTING: 'VESTING',
  WITHDRAW: 'WITHDRAW',
  DEPOSIT: 'DEPOSIT'
}

export const serverRenderWallet  = (isServer) => (dispatch) => {
  return dispatch({
    type: walletActionTypes.WALLET,
  })
}

export const startWalletInit = () => async (dispatch) => {
  try {

    const web3 = await getWeb3();

    const accounts = await web3.eth.getAccounts();

    console.log('account 0 : ' + accounts[0]);

    let walletAddress = localStorage.getItem('walletAddress');
    if(localStorage.getItem('walletAddress') && (localStorage.getItem('walletAddress').slice(1,-1) !== accounts[0])) {
      localStorage.removeItem('jwt');
      localStorage.removeItem('walletAdmin');
      localStorage.removeItem('psWhitelist');
      localStorage.removeItem('psTransfer');
      localStorage.removeItem('psPackage');
      localStorage.removeItem('walletAddress');
      localStorage.removeItem('approved');
      localStorage.removeItem('priceApproved');

      return dispatch({
        type: walletActionTypes.WALLET,
        address: null,
        addressType: "MetaMask",
        balance: 0
      });
    }

    console.log('wallet after restart :' + walletAddress);

    if (walletAddress) {
      return dispatch({
        type: walletActionTypes.WALLET,
        address: walletAddress,
        addressType: "MetaMask",
        balance: 0
      });
    }

  } catch(error) {
    console.log(error)
  }
}

export const changeAccount = () => async (dispatch) => {
  const web3 = await getWeb3();
  const accounts = await web3.eth.getAccounts();
  const balance = await web3.eth.getBalance(accounts[0])

  let wallet = accounts[0]

  console.log('wallet :' + wallet);

  localStorage.removeItem('jwt');
  localStorage.removeItem('walletAdmin');
  localStorage.removeItem('psWhitelist');
  localStorage.removeItem('psTransfer');
  localStorage.removeItem('psPackage');
  localStorage.removeItem('walletAddress');
  localStorage.removeItem('approved');
  localStorage.removeItem('priceApproved');

  return dispatch({
    type: walletActionTypes.WALLET,
    address: null,
    addressType: "MetaMask",
    balance: 0
  });
}
export const signature = () => async (dispatch) => {

  const web3 = await getWeb3();

  const accounts = await web3.eth.getAccounts();
  const balance = await web3.eth.getBalance(accounts[0])

  let wallet = accounts[0]

  localStorage.setItem('walletAddress', JSON.stringify(wallet));


  let options = {
    method: 'GET',
    prefix: 'connect/MetaMask/account',
    usingHeaders: false
  }

  let params = {
    ethAddress: wallet
  }

  let res = await ApiRest({options, params});

  if(res.status) {
    const message = "Your nonce is " + res.payload.nonce;
    let options = {
      method: 'POST',
      prefix: 'connect/MetaMask/auth',
      usingHeaders: false
    }

    const signature = await web3.eth.personal.sign(message, wallet,'');

    let params = {
    }

    let data = new FormData();
    data.append('ethAddress',  wallet);
    data.append('signature', signature)

    // call api signature to get access token
    let res2 = await ApiRest({options, params, data});

    if(res2.status) {
      localStorage.setItem('jwt', JSON.stringify(res2.payload.accessToken));
      localStorage.setItem('walletAdmin', JSON.stringify(res2.payload.walletAdmin));
      localStorage.setItem('psWhitelist', JSON.stringify(res2.payload.psWhitelist));
      localStorage.setItem('psTransfer', JSON.stringify(res2.payload.psTransfer));
      localStorage.setItem('psPackage', JSON.stringify(res2.payload.psPackage));
    }
  }

  // console.log(signature);

  return dispatch({
    type: walletActionTypes.WALLET,
    address: wallet,
    addressType: "MetaMask",
    balance: balance
  });
}

export const logoutWallet = () => async  (dispatch) => {
  localStorage.removeItem('jwt');
  localStorage.removeItem('walletAdmin');
  localStorage.removeItem('psWhitelist');
  localStorage.removeItem('psTransfer');
  localStorage.removeItem('psPackage');
  localStorage.removeItem('walletAddress');
  localStorage.removeItem('approved');
  localStorage.removeItem('priceApproved');

  return dispatch({
    type: walletActionTypes.WALLET,
    address: null,
    addressType: "MetaMask",
    balance: 0
  });
}


