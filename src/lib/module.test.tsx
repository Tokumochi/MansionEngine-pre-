import { initVar } from './CodeGenerator';
import { DataState } from './redux/states';

const datas: DataState[] = [
    { name: 'num', type: "Number", value: 10, members: [] },
    { name: 'empty', type: "Struct", value: -1, members: [] },
    { name: 'one_member', type: "Struct", value: -1, members: [
        { name: 'one', type: "Number", value: 11, members: [] },
    ]},
    { name: 'two_member', type: "Struct", value: -1, members: [
        { name: 'one', type: "Number", value: 11, members: [] },
        { name: 'two', type: "Number", value: 22, members: [] },
    ]},
    { name: 'ball', type: "Struct", value: -1, members: [
        { name: 'GameObject', type: "Struct", value: -1, members: [
            { name: 'position', type: "Struct", value: -1, members: [
                { name: 'x', type: "Number", value: 400, members: [] },
                { name: 'y', type: "Number", value: 300, members: [] },
            ]},
            { name: 'radius', type: "Number", value: 50, members: [] },
        ]},
        { name: 'Rigidbody', type: "Struct", value: -1, members: [
            { name: 'velocity', type: "Struct", value: -1, members: [
                { name: 'x', type: "Number", value: 2, members: [] },
                { name: 'y', type: "Number", value: 3, members: [] },
            ]},
            { name: 'mass', type: "Number", value: 200, members: [] },
            { name: 'bounce', type: "Number", value: 0.5, members: [] },
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