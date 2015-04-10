'use strict';

var qretry = require('qretry');
var request = require('request-promise');

var RESTMAIL_URL = 'https://restmail.net/mail/';

/**
 * Returns all email messages for the specified user, as an array of JSON blobs, with the newest messages first.
 * @param  {String} user The user account to check (without '@restmail.net').
 * @return {Promise}     A Promise with the found emails (or an empty array if no emails were found).
 */
function restmailGet(user) {
  return request(RESTMAIL_URL + user, {json: true});
}

/**
 * Returns all email messages for the specified user, as an array of JSON blobs, with the newest messages first.
 * @param  {String} user The user account to check (without '@restmail.net').
 * @return {Promise}     A Promise with the found emails, or a rejected promise if no emails were found.
 */
function restmailGetAndRejectEmpty(user) {
  return restmailGet(user).then(function (messages) {
    if (!messages.length) {
      throw new Error('No messages found for user: ' + user);
    }
    return messages;
  });
}

/**
 * Returns all email messages for the specified user, as an array of JSON blobs, with the newest messages first.
 * @param  {String} user The user account to check (without '@restmail.net').
 * @param  {Object} options An **qretry** options object with the following optional parameters:
 * - `maxRetry` (Number) optional: set the maximum retry (default is 5)
 * - `interval` (Number) optional: set the initial interval in milliseconds between the first and the second call. (default is 500)
 * - `intervalMultiplicator` (Number >= 1) optional: set the multiplicator which increase the interval through tries. (default is 1.5)
 * @return {Promise}     A Promise with the found emails, or a rejected promise if no emails were found.
 */
function restmailPoll(user, options) {
  return qretry(function () {
    return restmailGetAndRejectEmpty(user);
  }, options);
}

module.exports = restmailPoll;
