export function loggedInUserId() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
        return user.id;
    } else {
        return null;
    }
}
export function handleResponse(response) {
    if (response.ok && response.status == 204) {
        return;
    }
    let json = response.json();
    if (!response.ok) {
        return json.then(r => Promise.reject(r.message || r.error));
    }
    return json;
}