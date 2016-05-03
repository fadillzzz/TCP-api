/**
 * Instantiate an account object
 *
 * @param {SteamAccount} steamAccount An instance of the SteamAccount class
 */
function Account(steamAccount)
{
  this.steam = steamAccount;
}

/**
 * Returns the Steam account associated with the account
 *
 * @return {SteamAccount}
 */
Account.prototype.getSteamAccount = function ()
{
  return this.steam;
};

/**
 * Returns the Steam ID64 of the account
 *
 * @return {String}
 */
Account.prototype.getId = function ()
{
  return this.steam.getId();
};

module.exports = Account;
