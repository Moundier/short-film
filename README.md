# Readme

This is an angular ionic project

### Scaffold

- `npx npm install`
- `npx ionic serve`

### Todo
- Pagination on Scroll https://www.youtube.com/watch?v=eXd1dcbAZSw

Search for: how to implement ion slides in ionic

- `Implement login page`
- `Implement register page`
- `Implement user session`
- `Implement cookies instead of localstorage`
- `Implement userModel and tokensModel on register and on login`

- `Implement save and wipe keywords`
- `Implement find programs`
- `Later on find them by user, item and content based recommendation`

### State manager

Client Interceptor
- intercepts each request, and sends the token in the http header on valid credetials.

Server Interceptor
- does the same, but in each request it validates or invalidates the token.

Client guard
- prevents or allows access depending if tokens are in the localstorage

About the Tokens
- When the access token expires, the refresh token its used to get fresh access token.
- When the refresh token expires, the user session is finished, because the user cannot request new tokens.
- Then the user is redirected and asked to login again.

