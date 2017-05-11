import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {Modal, Input, DatePicker, Radio, Alert, Button} from 'antd'
const RadioGroup = Radio.Group
import './personmodal.scss'
import {personModalAction} from '../actions/personmodalaction'

class PersonModal extends Component {

    constructor(props) {
        super(props)
        this._person = null;

        this.state = {
            title: 'Add Person',
            visible: false,
            name: '',
            age: '',
            birthday: new Date(),
            sex: 0,
            address: '',
        }

        this.show = this.show.bind(this)
        this._savePerson = this._savePerson.bind(this)
        this.onClose = this.onClose.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps});
        if (typeof nextProps.data !== 'undefined') {
            this._person = nextProps.data;
            this.onClose();
        }
    }

    _savePerson() {
        if (this._person === null) {
            let person = {
                name: this.state.name,
                age: this.state.age,
                birthday: this.state.birthday,
                sex: this.state.sex,
                address: this.state.address
            }
            this.props.save(person);
        } else {
            let person = {
                id: this._person.id,
                name: this.state.name,
                age: this.state.age,
                birthday: this.state.birthday,
                sex: this.state.sex,
                address: this.state.address
            }
            this.props.save(person);
        }
    }

    show(person = null) {
        this.setState({visible: true});
        this._person = person;
        console.log(person)
        if (this._person === null)
            this.setState({title: 'Add Person'});
        else
            this.setState({title: 'Modify Person'});
        if (this._person !== null) {
            this.setState({
                name: this._person.name,
                age: this._person.age,
                birthday: this._person.birthday,
                sex: this._person.sex,
                address: this._person.address,
            })
        } else {
            this.setState({
                name: '',
                age: '',
                birthday: new Date(),
                sex: 0,
                address: ''
            })
        }
    }

    onClose() {
        this.setState({visible: false});
        this.props.onClose(this._person);
    }

    onChange(name, value) {
        this.setState({[name]: value})
    }

    render() {
        return (
            <div>
                <Modal title={this.state.title} visible={this.state.visible} closable={false}
                       footer={[
                           <Button key="back" size="large" onClick={this.onClose}>Cancel</Button>,
                           <Button key="submit" type="primary" size="large" loading={this.props.loading}
                                   onClick={this._savePerson}>
                               Save
                           </Button>,
                       ]}>
                    {
                        typeof this.state.error === 'string' && this.state.error !== '' ?
                            <Alert message={this.state.error}
                                   type="error"
                                   closable
                            /> : null
                    }
                    <div className="person">
                        <div>name:</div>
                        <div>
                            <Input value={this.state.name} onChange={(e) => {
                                this.onChange('name', e.target.value)
                            }}/>
                        </div>
                        <div>age:</div>
                        <div>
                            <Input value={this.state.age} onChange={(e) => {
                                this.onChange('age', e.target.value)
                            }}/>
                        </div>
                        <div>birthday:</div>
                        <div>
                            <DatePicker value={moment(this.state.birthday)} format="YYYY-MM-DD" onChange={(e) => {
                                this.onChange('birthday', e.toDate())
                            }} allowClear={false}/>
                        </div>
                        <div>sex:</div>
                        <div>
                            <RadioGroup value={this.state.sex} name="sex" onChange={(e) => {
                                this.onChange('sex', e.target.value)
                            }}>
                                <Radio value={1}>male</Radio>
                                <Radio value={2}>female</Radio>
                                <Radio value={0}>secret</Radio>
                            </RadioGroup>
                        </div>
                        <div>address：</div>
                        <div>
                            <Input value={this.state.address} onChange={(e) => {
                                this.onChange('address', e.target.value)
                            }}/>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return state.PersonModalReducer;
}

export default connect(mapStateToProps, personModalAction, null, {withRef: true})(PersonModal)