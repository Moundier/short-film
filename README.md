# Readme

This is an angular ionic project

### Scaffold

- `npx npm install`
- `npx ionic serve`

### Todo
- Pagination on Scroll https://www.youtube.com/watch?v=eXd1dcbAZSw

Search for: how to implement ion slides in ionic

- `Implement action play and stop `
- `Implement action mute and dismute`
- `Implement action play on focus`

- `Implement pseudo: IF NOT video THEN image`

- `Implement login page`
- `Implement register page`

- `Implement user session`
- `Implement cookies instead of localstorage`

### State manager
- The interceptor intercepts each request, and sends the token in the http header.

- The server intereceptor does the same, in each request it validates or invalidates the token.

- The authGuard prevents or allows access depending if tokens are in the localstorage

- When the access token expires, the refresh token its used to get fresh access token.
- When the refresh token expires, the user session is finished.
- So the refresh token refreshes many times but lives only once and when it dies (expires) the user session is finished.
Then the user is redirected and asked to login again.

