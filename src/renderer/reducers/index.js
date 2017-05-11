import MainReducer from './mainreducer'
import PersonModalReducer from './personmodalreducer'
import {combineReducers} from 'redux'

export default combineReducers({
    MainReducer,
    PersonModalReducer
})