# restmail-client

Client for [restmail.net](http://restmail.net/) which polls for messages. Returns all mail for the specified user, as an array of JSON blobs, with the newest messages first.

## Installation:
```sh
% npm i pdehaan/restmail-client -S
```

## Usage:
```
var restmail = require('restmail-client');

restmail('peter', {maxRetry: 2}).then(console.log).catch(console.error);
```

The above snippet will poll the peter\@restmail.net inbox for messages.

## API:

### `restmail(<user>, [<options>])`

#### Parameters:

- `user` &mdash; String; The user/inbox to check for messages.
- `options` &mdash; Object; A [qretry](https://www.npmjs.com/package/qretry) `options` object with the following optional parameters:
    - `maxRetry` **(Number)** *optional*: set the maximum retry (default is 5)
    - `interval` **(Number)** *optional*: set the initial interval in milliseconds between the first and the second call. (default is 500)
    - `intervalMultiplicator` **(Number >= 1)** *optional*: set the multiplicator which increase the interval through tries. (default is 1.5)

#### Response:

This method returns a resolved promise with an array of messages from [restmail.net](http://restmail.net/), or a rejected promise if no emails were found.
