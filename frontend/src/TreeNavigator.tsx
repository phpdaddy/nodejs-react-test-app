import React, {Component} from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import axios from 'axios';
import withStyles from "@material-ui/core/styles/withStyles";
import {TextField} from "@material-ui/core";


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
                label={treeItemData.name}
                children={children}
            />
        );
    });
};

class TreeNavigator extends Component<any, any> {
    state: any = {
        treeItems: []
    };

    async componentDidMount() {
        const response = await axios.get('http://localhost:8081/nodes-tree');
        //console.log(response.data);
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
            <TreeView
                className={this.props.classes.root}
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronRightIcon/>}
            >
                {getTreeItemsFromData(this.state.treeItems)}
            </TreeView>
        </div>
    }
}

export default withStyles(styles)(TreeNavigator);
