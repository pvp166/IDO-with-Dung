const authHeader = ({method}) => {

    const jwt = JSON.parse(localStorage.getItem('jwt'))

    if (jwt) {
        let headers = {
            Authorization: 'Bearer ' + jwt.replace('"', '')
        }
        if(method !== 'GET') {
            headers['ContentType'] = 'multipart/form-data'
        }
        return headers;
    } else {
        return {
            ContentType: 'multipart/form-data',
        }
    }
}

export default authHeader