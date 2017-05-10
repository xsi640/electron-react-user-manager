import React, {Component} from 'react'
import {Table, Button} from 'antd'
import PersonModal from './personmodal'

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            loading: false,
            data: [],
        }
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

        const {loading, selectedRowKeys, data} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        const isSingleSelected = selectedRowKeys.length === 1;
        return (
            <div style={{padding: 20}}>
                <div style={{marginBottom: 16}}>
                    <Button type="primary" loading={loading}>Add</Button>
                    <Button type="primary" disabled={!isSingleSelected} loading={loading} style={{marginLeft: 10}}>Modify</Button>
                    <Button type="primary" disabled={!hasSelected} loading={loading}
                            style={{marginLeft: 10}}>Delete</Button>
                </div>
                <PersonModal visible={true}/>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data}/>
            </div>
        )
    }
}