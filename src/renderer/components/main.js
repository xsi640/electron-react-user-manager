import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Table, Button, Spin} from 'antd'
import PersonModal from './personmodal'
import {mainAction} from '../actions/mainaction'

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            selectedRowKeys: []
        }

        this.showPersonModal = this.showPersonModal.bind(this)
        this.closePersonModal = this.closePersonModal.bind(this)
        this.onSelectChange = this.onSelectChange.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleModify = this.handleModify.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps});
        if (typeof nextProps.deletedId !== 'undefined') {
            for (let id of nextProps.deletedId) {
                let obj = null;
                for (let o of this.state.data) {
                    if (o.id === id) {
                        obj = o;
                        break;
                    }
                }
                if (obj !== null) {
                    this.state.data.splice(this.state.data.indexOf(obj), 1)
                }
            }
            this.state.selectedRowKeys = [];
        }
    }

    componentDidMount() {
        this.props.list();
    }

    showPersonModal(e, person) {
        this.refs.personModal.getWrappedInstance().show(person)
    }

    handleDelete(e) {
        this.props.delete(this.state.selectedRowKeys)
    }

    handleModify(e){
        let id = this.state.selectedRowKeys[0];
        let person = null;
        for(let p of this.state.data){
            if(p.id === id){
                person = p;
                break;
            }
        }
        this.refs.personModal.getWrappedInstance().show(person)
    }

    closePersonModal(person) {
        if(person != null){
            let obj = null;
            for (let o of this.state.data) {
                if (o.id === person.id) {
                    obj = o;
                    break;
                }
            }
            if(obj == null){
                this.state.data.push(person);
            }else{
                this.state.data[this.state.data.indexOf(obj)] = person;
                this.forceUpdate();
            }
        }
    }

    onSelectChange(selectedRowKeys) {
        this.setState({selectedRowKeys})
    }

    render() {
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
        }, {
            title: 'Age',
            dataIndex: 'age',
        }, {
            title: 'Address',
            dataIndex: 'address',
        }];

        const {selectedRowKeys, data, loading} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0 && !loading;
        const isSingleSelected = selectedRowKeys.length === 1 && !loading;
        return (
            <div style={{padding: 20}}>
                <div style={{marginBottom: 16}}>
                    <Button type="primary" onClick={this.showPersonModal}>Add</Button>
                    <Button type="primary" disabled={!isSingleSelected} onClick={this.handleModify}
                            style={{marginLeft: 10}}>Modify</Button>
                    <Button type="primary" disabled={!hasSelected} onClick={this.handleDelete}
                            style={{marginLeft: 10}}>Delete</Button>
                </div>
                <PersonModal ref="personModal" onClose={this.closePersonModal}/>
                <Table rowKey="id" rowSelection={rowSelection} columns={columns} dataSource={data} loading={loading}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state.MainReducer;
}

export default connect(mapStateToProps, mainAction)(Main)