import jwtDecode from 'jwt-decode';


// returns the time left till token expires
function getTimeLeftToExpire(token) {
  const expiryTime = jwtDecode(token).exp;
  const now = Math.floor(new Date().getTime() / 1000);
  const timeLeftToExpire = expiryTime - now;
  return timeLeftToExpire;
}

// refresh token if it has less than two minutes to expire
export function shouldRefreshToken(token) {
  const threshold = 120;
  const timeLeftToExpire = getTimeLeftToExpire(token);

  if (timeLeftToExpire < threshold) {
    return true;
  }
  return false;
}

// logout user if token has expired
export function logoutIfTokenExpired(token) {
  const timeLeftToExpire = getTimeLeftToExpire(token);

  if (timeLeftToExpire < 0) {
    window.location.href = `${window.location.origin}/logout/`;
    return;
  }
}
