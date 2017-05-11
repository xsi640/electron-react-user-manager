const initialState = {}

export default function PersonModalReducer(state = initialState, action) {
    console.log(action)

    switch (action.type) {
        case 'SAVE':
            if (typeof action.payload.error === 'undefined') {
                return {...state, ...action.payload, loading: false, visible: false}
            } else {
                return {...state, ...action.payload, loading: false, visible: true}
            }
        case 'SAVE_WORK':
            return {...state, data: undefined, loading: true, visible: true}
        default:
            return state;
    }
}