'use strict';

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
                  email: 'athmangude@gmail.com',
                  password: 'secretword'
              }).then((response) => {
                  if(response.status === true) {
                      return response;
                  } else {
                      throw {
                          badCredentials: response.status === false
                      }
                  }
              }).then((response) => return response.json).then((responseData) => {
                //   Store the user credentials for future login
                AsyncStorage.multiSet([
                    ['authEmail', email],
                    ['authPassword', password]
                ], (error) => {
                    if (error) {
                        throw error;
                    }
                    return callback({loggedIn: true});
                });
              }).catch((error) => {
                  callback(error);
              });
        });

    }

}

module.exports = AuthenticationService;
