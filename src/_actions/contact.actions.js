import { contactConstants } from '../_constants';
import { contactService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const contactActions = {
    add,
    update,
    getAll,
    getById,
    search,
    delete: _delete
};

function add(user_id, contact) {
    return dispatch => {
        dispatch(request(user_id, contact.email));

        contactService.add(user_id, contact)
            .then(
                contact => {
                    dispatch(success(contact));
                    history.push('/my-contacts/' + contact.id);
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user_id, email) { return { type: contactConstants.ADD_REQUEST, user_id, email } }
    function success(contact) { return { type: contactConstants.ADD_SUCCESS, contact } }
    function failure(error) { return { type: contactConstants.ADD_FAILURE, error } }
}

function update(user_id, id, contact) {
    return dispatch => {
        dispatch(request(user_id, id));

        contactService.update(user_id, id, contact)
            .then(
                c => {
                    dispatch(success(contact));
                    history.push('/my-contacts/' + contact.id);
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user_id, id) { return { type: contactConstants.UPDATE_REQUEST, id } }
    function success(contact) { return { type: contactConstants.UPDATE_SUCCESS, contact } }
    function failure(error) { return { type: contactConstants.UPDATE_FAILURE, error } }
}

function getAll(user_id, page_number) {
    return dispatch => {
        dispatch(request());

        contactService.getAll(user_id, page_number)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: contactConstants.GETALL_REQUEST } }
    function success(data) { return { type: contactConstants.GETALL_SUCCESS, contacts: data.contacts, total_pages: data.total_pages, page: data.page } }
    function failure(error) { return { type: contactConstants.GETALL_FAILURE, error } }
}

function getById(user_id, id) {
    return dispatch => {
        dispatch(request());

        contactService.getById(user_id, id)
            .then(
                contact => dispatch(success(contact)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: contactConstants.GET_REQUEST } }
    function success(contact) { return { type: contactConstants.GET_SUCCESS, contact } }
    function failure(error) { return { type: contactConstants.GET_FAILURE, error } }
}

function search(user_id, search_query, page_number) {
    return dispatch => {
        dispatch(request());

        contactService.search(user_id, search_query, page_number)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: contactConstants.SEARCH_REQUEST } }
    function success(data) { return { type: contactConstants.SEARCH_SUCCESS, contacts: data.contacts, total_pages: data.total_pages, page: data.page } }
    function failure(error) { return { type: contactConstants.SEARCH_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(user_id, id) {
    return dispatch => {
        dispatch(request(id));

        contactService.delete(user_id, id)
            .then(
                contact => {
                    dispatch(success(id));
                    history.push('/my-contacts');
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: contactConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: contactConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: contactConstants.DELETE_FAILURE, id, error } }
}