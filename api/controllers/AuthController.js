/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Account = require('../tcp/Account.js'),
    SteamAccount = require('../tcp/SteamAccount.js'),
    SteamAPI = require('../tcp/SteamAPI.js');

module.exports = {
    /**
    * `AuthController.login()`
    */
    login: function (req, res) {
        var openid = require('openid'),
            party = new openid.RelyingParty(
                sails.config.steam.realm+'/verify',
                sails.config.steam.realm,
                true,
                false,
                []
            );

        party.authenticate('http://steamcommunity.com/openid', false, function (error, authUrl)
        {
            if (error) {
                res.redirect('/auth-failed');
                sails.log.error(error.message);
            } else if (! authUrl) {
                res.redirect('/server-too-dumb');
                sails.log.error('Failed to generate authentication URL');
            } else {
                res.redirect(authUrl);
            }
        });
    },

    /**
    * `AuthController.verify()`
    */
    verify: function (req, res) {
        var openid = require('openid'),
            party = new openid.RelyingParty(
                sails.config.steam.realm+'/verify',
                sails.config.steam.realm,
                true,
                false,
                []
            );

        party.verifyAssertion(req, function (error, result)
        {
            if (! error && result.authenticated) {
                req.session.authenticated = true;
                req.session.user = new Account(new SteamAccount(
                    result.claimedIdentifier.match(/\d+/)[0],
                    new SteamAPI(sails.config.steam.key)
                ));

                req.session.user.getSteamAccount().init(function () {
                    res.redirect('/profile');
                });
            } else {
                res.json({dude: "whaddyawan"});
            }
        });
    }
};
