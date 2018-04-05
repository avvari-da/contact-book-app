export function authHeader() {
    // return authorization header with token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Token ' + user.token };
    } else {
        return { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    }
}