import React, {Component} from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import axios from 'axios';
import withStyles from "@material-ui/core/styles/withStyles";
import {CircularProgress, TextField} from "@material-ui/core";


const styles = {
    root: {
        height: 216,
        flexGrow: 1,
        maxWidth: 800,
        display: 'flex',
        justifyContent: 'center',
    },
    text: {
        marginTop: 100,
        width: '100%',
        marginBottom: 10
    },
    progress: {
        margin: '0 auto',
        display: 'block'
    },
    progressContainer: {
        margin: '0 auto',
        display: 'block'
    },
    progressHeader: {
        textAlign: 'center' as 'center'
    }
};

const getTreeItemsFromData = (treeItems: any) => {
    return treeItems.map((treeItemData: any, index: number) => {
        let children = undefined;
        if (treeItemData.children && treeItemData.children.length > 0) {
            children = getTreeItemsFromData(treeItemData.children);
        }
        return (
            <TreeItem
                key={treeItemData.name + index.toString()}
                nodeId={treeItemData.name + index.toString()}
                label={treeItemData.name + ' (' + treeItemData.size + ')'}
                children={children}
            />
        );
    });
};

class TreeNavigator extends Component<any, any> {
    state: any = {
        treeItems: null
    };

    async componentDidMount() {
        const response = await axios.get('http://localhost:8081/nodes-tree');

        this.setState({
            treeItems: response.data
        });
    }

    render(): React.ReactNode {
        return <div>
            <TextField
                className={this.props.classes.text}
                placeholder="Search">
            </TextField>
            {!this.state.treeItems &&
            <div className={this.props.classes.progressContainer}>
                <h3 className={this.props.classes.progressHeader}>Loading tree ...</h3>
                <CircularProgress
                    className={this.props.classes.progress}/>
            </div>}
            {this.state.treeItems &&
            <TreeView
                className={this.props.classes.root}
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronRightIcon/>}
            >
                {getTreeItemsFromData(this.state.treeItems)}
            </TreeView>}
        </div>
    }
}

export default withStyles(styles)(TreeNavigator);
