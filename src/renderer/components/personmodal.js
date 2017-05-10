import React, {Component} from 'react'
import {Modal, Input, DatePicker, Radio, Alert, Button} from 'antd'
const RadioGroup = Radio.Group
import './personmodal.scss'

export default class PersonModal extends Component {

    constructor(props) {
        super(props)
    }

    handleOK(e) {
    }

    handleCancel(e) {
    }

    render() {
        return (
            <div>
                <Modal title="Add Person" visible={this.props.visible} closable={false} onOk={::this.handleOK}
                       onCancel={::this.handleCancel}>
                    <Alert message="Error Text"
                           type="error"
                           closable
                    />
                    <div className="person">
                        <div>name:</div>
                        <div>
                            <Input/>
                        </div>
                        <div>age:</div>
                        <div>
                            <Input/>
                        </div>
                        <div>birthday:</div>
                        <div>
                            <DatePicker/>
                        </div>
                        <div>sex:</div>
                        <div>
                            <RadioGroup>
                                <Radio value={1}>male</Radio>
                                <Radio value={2}>female</Radio>
                                <Radio value={0}>secret</Radio>
                            </RadioGroup>
                        </div>
                        <div>address：</div>
                        <div>
                            <Input/>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}