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

The above snippet will poll the peter@restmail.net inbox for messages.

## API:

### `restmail(<user>, [<options>])`

#### Parameters:

- `user` &mdash; String; The user/inbox to check for messages.
- `options` &mdash; Object; See [qretry](https://www.npmjs.com/package/qretry) usage for more information.

#### Response:

This method returns a resolved promise with an array of messages from [restmail.net](http://restmail.net/), or a rejected promise if no emails were found.
