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

            console.log(responseData);

            if(responseData.status === false) {
                console.log("throwing bad credentials");
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
                        console.log("error saving into asyncstorage");
                        throw error;
                    }
                    return callback({loggedIn: true});
                });
            }
          }).catch((error) => {
              console.log("caught thrown error");
              console.log(error);
              callback(error);
          });

    }

    logup(credentials, callback) {
        return callback({loggedIn: true})
    }

}

module.exports = new AuthenticationService();
