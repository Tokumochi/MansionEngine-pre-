import { initVar } from './CodeGenerator';
import { DataState } from './redux/states';

const datas: DataState[] = [
    { id: '1', name: 'num', type: "Number", value: 10, members: [] },
    { id: '2', name: 'empty', type: "Struct", value: -1, members: [] },
    { id: '3', name: 'one_member', type: "Struct", value: -1, members: [
        { id: '31', name: 'one', type: "Number", value: 11, members: [] },
    ]},
    { id: '4', name: 'two_member', type: "Struct", value: -1, members: [
        { id: '41', name: 'one', type: "Number", value: 11, members: [] },
        { id: '42', name: 'two', type: "Number", value: 22, members: [] },
    ]},
    { id: '5', name: 'ball', type: "Struct", value: -1, members: [
        { id: '51', name: 'GameObject', type: "Struct", value: -1, members: [
            { id: '511', name: 'position', type: "Struct", value: -1, members: [
                { id: '5111', name: 'x', type: "Number", value: 400, members: [] },
                { id: '5112', name: 'y', type: "Number", value: 300, members: [] },
            ]},
            { id: '512', name: 'radius', type: "Number", value: 50, members: [] },
        ]},
        { id: '52', name: 'Rigidbody', type: "Struct", value: -1, members: [
            { id: '521', name: 'velocity', type: "Struct", value: -1, members: [
                { id: '5211', name: 'x', type: "Number", value: 2, members: [] },
                { id: '5212', name: 'y', type: "Number", value: 3, members: [] },
            ]},
            { id: '522', name: 'mass', type: "Number", value: 200, members: [] },
            { id: '523', name: 'bounce', type: "Number", value: 0.5, members: [] },
        ]},
    ]},
];

test('GenerateInitVar test', () => {
    expect(initVar(datas[0])).toEqual("10");
    expect(initVar(datas[1])).toEqual("{  }");
    expect(initVar(datas[2])).toEqual("{ one: 11 }");
    expect(initVar(datas[3])).toEqual("{ one: 11, two: 22 }");
    expect(initVar(datas[4])).toEqual("{ GameObject: { position: { x: 400, y: 300 }, radius: 50 }, Rigidbody: { velocity: { x: 2, y: 3 }, mass: 200, bounce: 0.5 } }");
});