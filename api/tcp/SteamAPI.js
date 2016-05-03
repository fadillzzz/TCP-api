var request = require('request'),
    querystring = require('querystring');

/**
 * Instantiates an object to query the Steam Web API
 *
 * @param {String} key
 */
function SteamAPI(key)
{
  this.key = key;
  this.base = 'https://api.steampowered.com';
  this.interfaces = {
    playerSum: 'ISteamUser'
  };
  this.methods = {
    ISteamUser: {
      playerSum: {
        name: 'GetPlayerSummaries',
        version: 'v0002'
      }
    }
  };
}

/**
 * Fetches the basic user information (i.e. player summaries)
 *
 * @param  {String}    id       SteamID64 of the user
 * @param  {Function}  callback
 * @return {Undefined}
 */
SteamAPI.prototype.getUserInfo = function (id, callback) {
  var endpoint = getEndpoint.apply(this, ['playerSum']);
  endpoint = endpoint+'?'+querystring.stringify({key: this.key, steamids: id});

  request.get(endpoint, function (error, response, body) {
    if ( ! error && response.statusCode === 200) {
      var info = JSON.parse(body).response.players[0] || {};
      callback(info);
    } else {
      sails.log.error(error);
    }
  });
};

/**
 * Builds an endpoint for querying
 *
 * @param  {String} target An alias of the target endpoint
 * @return {String}
 */
function getEndpoint(target)
{
  var interface = this.interfaces[target],
      method = this.methods[interface][target];

  return this.base+'/'+interface+'/'+method.name+'/'+method.version
}

module.exports = SteamAPI;
