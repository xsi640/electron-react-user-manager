import * as IPCMESSAGE from '../../constipcmessage'
const {ipcRenderer} = require('electron')

export const mainAction = {
    list(){
        return dispatch => {
            dispatch({
                type: 'LIST_WORK'
            })
            ipcRenderer.once(IPCMESSAGE.GET_ALL, (event, args) => {
                dispatch({
                    type: 'LIST',
                    payload: args
                })
            })
            ipcRenderer.send(IPCMESSAGE.GET_ALL)
        }
    },
    delete(ids){
        return dispatch => {
            dispatch({
                type:'DELETE_WORK'
            })
            ipcRenderer.once(IPCMESSAGE.DELETE, (event, args) => {
                dispatch({
                    type: 'DELETE',
                    payload: ids
                })
            })
            ipcRenderer.send(IPCMESSAGE.DELETE, ids)
        }
    }
}