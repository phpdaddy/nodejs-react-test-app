import {nodesToTree} from "../src/nodes.service";

describe('Test nodesToTree transformation', () => {

    it('should return a string', () => {
        const nodes = [{
            "name": "blue",
            "size": 5
        }, {
            "name": "blue > yellow",
            "size": 5
        }, {
            "name": "blue > yellow > purple",
            "size": 5
        }, {
            "name": "blue > yellow > red",
            "size": 5
        }];

        const tree: any = [{
            name: 'blue',
            size: 5,
            children: [
                {
                    name: 'yellow',
                    size: 5,
                    children: [
                        {
                            name: 'purple',
                            size: 5,
                            children: []
                        },
                        {
                            name: 'red',
                            size: 5,
                            children: []
                        }
                    ]
                }
            ]
        }];
        expect(nodesToTree(nodes)).toEqual(tree);
    });
});
