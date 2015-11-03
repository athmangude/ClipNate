// 'use strict'

var AsyncStorage = require('react-native').AsyncStorage;

class AuthenticationService {

    login(credentials, callback) {

        var email = credentials.email;
        var password = credentials.password;

        fetch('http://apitest.shopnate.com.au/sessions/resource', {
              method: 'post',
              headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  method: 'email',
                  email: credentials.email,
                  password: credentials.password
              })
          }).then((response) => {
              return response;
          }).then((response) => {
              return response.json();
          }).then((responseData) => {
            //   Store the user credentials for future login
            if(responseData.status === false) {
                throw {
                    badCredentials: responseData.status === false
                }
            } else {
                console.log('setting asyncstorage');
                AsyncStorage.multiSet([
                    ['authEmail', email],
                    ['authPassword', password],
                    ['authUserName', responseData.user.shopper_fname]
                ], (error) => {
                    if (error) {
                        throw error;
                    }
                    return callback({loggedIn: true});
                });
            }
          }).catch((error) => {
              callback(error);
          });

    }

    logup(credentials, callback) {
        return callback({loggedIn: true})
    }

}

module.exports = new AuthenticationService();
