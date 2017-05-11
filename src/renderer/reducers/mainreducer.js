const initialState = {}

export default function mainReducer(state = initialState, action) {
    switch (action.type) {
        case 'LIST':
            return {...state, ...action.payload, loading: false}
        case 'LIST_WORK':
            return {...state, loading: true}
        case 'DELETE':
            return {...state, deletedId: action.payload, loading: false}
        case 'DELETE_WORK':
            return {...state, loading: true}
        default:
            return state;
    }
}