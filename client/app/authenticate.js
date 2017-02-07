class Auth {

  static authenticateUser(token, refresh_token) {
    sessionStorage.setItem('oauth_token', token);
    sessionStorage.setItem('refresh_token', refresh_token);
  }

  static checkUserAuthentication() {
    return sessionStorage.getItem('oauth_token') !== null;
  }

  static deauthenticateUser() {
    sessionStorage.removeItem('oauth_token');
    sessionStorage.removeItem('refresh_token');
  }

  static getUserToken() {
    sessionStorage.getItem('oauth_token');
  }

  static getUserRefreshToken() {
    sessionStorage.getItem('refresh_token');
  }

}

export default Auth;
