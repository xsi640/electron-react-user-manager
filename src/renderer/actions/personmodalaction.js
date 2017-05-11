import * as IPCMESSAGE from '../../constipcmessage'
const {ipcRenderer} = require('electron')

export const personModalAction = {
    save(person){
        return dispatch => {
            dispatch({
                type: 'SAVE_WORK'
            })
            ipcRenderer.once(IPCMESSAGE.SAVE, (event, args) => {
                dispatch({
                    type: 'SAVE',
                    payload: args
                })
            })
            ipcRenderer.send(IPCMESSAGE.SAVE, person)
        }
    }
}