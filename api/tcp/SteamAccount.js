/**
 * Instantiate a Steam account object
 *
 * @param {String}   id       The Steam ID64 of the account
 * @param {SteamAPI} steamAPI An instance of the SteamAPI class
 */
function SteamAccount(id, steamAPI)
{
  this.id = id;
  this.api = steamAPI;
}

/**
 * Returns the Steam ID64 of the account
 *
 * @return {String}
 */
SteamAccount.prototype.getId = function ()
{
  return this.id;
};

/**
 * Returns the profile URL of the account
 *
 * @return {String}
 */
SteamAccount.prototype.getProfileUrl = function ()
{
  return this.profileUrl;
};

/**
 * Returns the name of the Steam profile
 *
 * @return {String}
 */
SteamAccount.prototype.getName = function ()
{
  return this.name;
};

/**
 * Returns the avatar URL of the Steam profile
 *
 * @return {String}
 */
SteamAccount.prototype.getAvatar = function ()
{
  return this.avatar;
};

/**
 * Initialise object by fetching info from the Steam Web API
 *
 * @return {Undefined}
 */
SteamAccount.prototype.init = function (callback)
{
  var self = this;

  this.api.getUserInfo(this.id, function (result) {
    self.name = result.personaname;
    self.profileUrl = result.profileurl;
    self.avatar = result.avatarfull;
    callback(result);
  });
};

module.exports = SteamAccount;
