import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFiles } from '../actions';

class FilesList extends Component {
    componentDidMount() {
        this.props.fetchFiles();
    }

    renderFiles() {
        return this.props.files.map((file) => {
            return <li key={file.id}>{file.name}</li>;
        });
    }

    render() {
        return (
            <div>
                LIST OF FILES NOW
                <ul>{this.renderFiles()}</ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { files: state.files };
}

function loadData(store) {
    return store.dispatch(fetchFiles());
}

export { loadData };

export default connect(mapStateToProps, { fetchFiles })(FilesList);
