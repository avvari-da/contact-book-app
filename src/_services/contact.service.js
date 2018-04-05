import { authHeader, handleResponse } from '../_helpers';

export const contactService = {
    add,
    update,
    getAll,
    getById,
    search,
    delete: _delete
};

function add(user_id, contact) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(contact)
    };
    return fetch('/users/' + user_id + '/contacts', requestOptions).then(handleResponse);
}

function update(user_id, id, contact) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(contact)
    };
    return fetch('/users/' + user_id + '/contacts/' + id, requestOptions).then(handleResponse);
}

function getAll(user_id, page_number) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch('/users/' + user_id + '/contacts?page=' + encodeURIComponent(page_number), requestOptions)
        .then(handleResponse)
        .then(response => response);
}

function getById(user_id, id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch('/users/' + user_id + '/contacts/' + id, requestOptions)
        .then(handleResponse)
        .then(contact => contact);
}

function search(user_id, search_query, page_number) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch('/users/' + user_id + '/contacts?q=' + encodeURIComponent(search_query) + '&page=' + encodeURIComponent(page_number), requestOptions)
        .then(handleResponse)
        .then(response => response);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(user_id, id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/users/' + user_id + '/contacts/' + id, requestOptions).then(handleResponse);;
}