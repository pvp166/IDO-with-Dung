import authHeader from "./auth_header";
import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig()

const ApiRest = async ({options, params, data}) => {

    // domain api
    let url = publicRuntimeConfig.API_DOMAIN ? publicRuntimeConfig.API_DOMAIN : "https://baoe-api.grooo.com.vn/";

    // interceptors
    const instance = axios.create();
    instance.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (error.response.status === 401) {
            localStorage.removeItem('jwt');
            localStorage.removeItem('walletAdmin');
            localStorage.removeItem('psWhitelist');
            localStorage.removeItem('psTransfer');
            localStorage.removeItem('psPackage');
            localStorage.removeItem('walletAddress');
            localStorage.removeItem('approved');
            localStorage.removeItem('priceApproved');
        }
        return Promise.reject(error);
    });

    let method = options.method

    let config = {
        params: params,
        headers: options.usingHeaders ? authHeader({method}) : '',
        data: data,
    }

    let response = {};

    if (options.method === 'GET') {
        console.log('[GET] => ' + url + options.prefix)
        return instance.get(url + options.prefix, config)
            .then((response) => {
                return {
                    status: true,
                    stateCode: response.status,
                    payload: response.data,
                    message: 'sent api get successful.'
                }
            })
            .catch((err) => {
                return {
                    stateCode: err.response.status,
                    status: false,
                    payload: err.response.data,
                    message: 'failed to send api get.'
                }
            })
    } else if (options.method === 'POST') {
        console.log('[POST] => ' + url + options.prefix)
        return  instance.post(url + options.prefix, config.data, {
            headers: config.headers,
            params: config.params
        })
            .then((response) => {
                return {
                    status: true,
                    stateCode: response.status,
                    payload: response.data,
                    message: 'sent api post successful.'
                }
            })
            .catch((err) => {
                console.log(err)
                return {
                    status: false,
                    stateCode:  err.response.status,
                    payload: err.response.data,
                    message: 'failed to send api post.'
                }
            })
    } else if (options.method === 'PUT') {
        return instance.put(url, config)
            .then((response) => {
                return {
                    status: true,
                    stateCode: response.status,
                    payload: response.data,
                    message: 'sent api put successful.'
                }
            })
            .catch((err) => {
                console.log(err)
                return {
                    status: false,
                    stateCode:  err.response.status,
                    payload: err.response.data,
                    message: 'failed to send api put.'
                }
            })
    } else if (options.method === 'DELETE') {
        return  instance.delete(url, config)
            .then((response) => {
                return {
                    status: true,
                    stateCode: response.status,
                    payload: response.data,
                    message: 'sent api delete successful.'
                }
            })
            .catch((err) => {
                console.log(err)
                return {
                    status: false,
                    stateCode: err.response.status,
                    payload: err.response.data,
                    message: 'failed to delete api post.'
                }
            })
    }
    return response
}

export default  ApiRest