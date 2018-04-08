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