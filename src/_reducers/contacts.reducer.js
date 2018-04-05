import { contactConstants } from '../_constants';

export function contacts(state = {}, action) {
    switch (action.type) {
        case contactConstants.ADD_REQUEST:
            return {
                loading: true
            };
        case contactConstants.ADD_SUCCESS:
            return {};
        case contactConstants.ADD_FAILURE:
            return {};
        case contactConstants.UPDATE_REQUEST:
            return {
                loading: true
            };
        case contactConstants.UPDATE_SUCCESS:
            return {};
        case contactConstants.UPDATE_FAILURE:
            return {};
        case contactConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case contactConstants.GETALL_SUCCESS:
            return {
                contacts: action.contacts,
                total_pages: action.total_pages,
                page: action.page
            };
        case contactConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case contactConstants.GET_REQUEST:
            return {
                loading: true
            };
        case contactConstants.GET_SUCCESS:
            return {
                contact: action.contact
            };
        case contactConstants.GET_FAILURE:
            return {
                error: action.error
            };
        case contactConstants.SEARCH_REQUEST:
            return {
                loading: true
            };
        case contactConstants.SEARCH_SUCCESS:
            return {
                contacts: action.contacts,
                total_pages: action.total_pages,
                page: action.page
            };
        case contactConstants.SEARCH_FAILURE:
            return {
                error: action.error
            };
        case contactConstants.DELETE_REQUEST:
            return {
                deleting: true
            };
        case contactConstants.DELETE_SUCCESS:
            // remove deleted contact from state
            return {};
        case contactConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to contact
            return {
                deleting: false,
                error: action.error
            };
        default:
            return state
    }
}