'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const SECRET_TOKEN = 'tecnomapstoken123'


function createToken(user) {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    }
    return jwt.encode(payload, SECRET_TOKEN);
}

function decodeToken(token) {
    const decoded = new Promise((resolve, reject)=>{
        try {
            
            const payload = jwt.decode(token, SECRET_TOKEN);
            
            if(payload.exp <= moment.unix() ) {
                reject({
                   status: 401,
                   message: 'The token has expired'
               });
            }

            resolve(payload.sub);

        } catch (e) {
            reject({
                status: 500,
                message: 'Invalid Token'
            });
        }
    });

    return decoded;
}  

module.exports = {
    createToken,
    decodeToken
}