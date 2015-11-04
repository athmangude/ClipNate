'use strict'

// require dependencies
var AsyncStorage = require('react-native').AsyncStorage;
var _ = require('lodash');

/**
 * Handles all authentication with server
 * @class AuthenticationService
 */
class AuthenticationService {

    /**
     * get the saved authentication info on device
     * @method getAuthenticationInfo
     * @param  {function}            callback function that is executed once the authentication info has been fetched
     * @return {Function}                       the callback function passed to the function
     */
    getAuthenticationInfo(callback) {
        AsyncStorage.multiGet(['authEmail', 'authPassword', 'authUserName'], (error, result) => {
            if (error) {
                return callback(error)
            }

            if (!result) {
                callback();
            }

            // create object from associative array of authentication info
            var zippedObject = _.zipObject(result);

            if (!zippedObject['authEmail']) {
                return callback();
            }

            var authenticationInfo = {
                authEmail: zippedObject['authEmail'],
                authPassword: zippedObject['authPassword'],
                authUserName: zippedObject['authPassword']
            }

            return callback(null, authenticationInfo);
        });
    }

    /**
     * verify user provided credentials and log the user in
     * @method login
     * @param  {Object}   credentials [an object containing the user's credentials]
     * @param  {Function} callback    [a callback function to be called once the user is signed in]
     * @return {Function}               [the callback function passed to the function]
     */
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

}

module.exports = new AuthenticationService();
