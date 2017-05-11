const initialState = {}

export default function PersonModalReducer(state = initialState, action) {
    switch (action.type) {
        case 'SAVE':
            if (typeof action.payload.error === 'undefined') {
                return {...state, ...action.payload, loading: false, visible: false}
            } else {
                return {...state, ...action.payload, loading: false}
            }
        case 'SAVE_WORK':
            return {...state, loading: true}
        default:
            return state;
    }
}