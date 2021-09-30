import { GenerateInitVar } from './module';
import { StructState } from './redux/states';

const structs: StructState[] = [
    { name: "Vector2d",
      members: [
        { name: "x", type: "Number" },
        { name: "y", type: "Number" } 
      ]
    },
    { name: "Rigidbody2d",
      members: [
        { name: "position", type: "Vector2d" },
        { name: "velocity", type: "Vector2d" },
        { name: "mass", type: "Number" },
        { name: "bounce", type: "Number" },
      ]
    },
    { name: "s1",
      members: [
        { name: "c", type: "Number" },
      ]
    },
    { name: "s2",
      members: [
        { name: "b", type: "s1" },
      ]
    },
    { name: "s3",
      members: [
        { name: "a", type: "s2" },
      ]
    },
]

test('GenerateInitVar test', () => {
    expect(GenerateInitVar("Number", [], [10])).toStrictEqual(["10", 1]);
    expect(GenerateInitVar("Number", [], [5, 6, 7])).toStrictEqual(["5", 1]);
    expect(GenerateInitVar("Number", [], [])).toBeUndefined();
    expect(GenerateInitVar("Number", [], [10], 1)).toBeUndefined(); 

    expect(GenerateInitVar("Vector2d", structs, [11, 23])).toStrictEqual(["{ x: 11, y: 23 }", 2]);
    expect(GenerateInitVar("Vector2d", structs, [11, 23, 34])).toStrictEqual(["{ x: 11, y: 23 }", 2]);
    expect(GenerateInitVar("Vector2d", structs, [11])).toBeUndefined();
    expect(GenerateInitVar("Vector2d", structs, [11, 23], 1)).toBeUndefined();

    expect(GenerateInitVar("Rigidbody2d", structs, [10, 20, 1, 2, 30, 0.5])).toStrictEqual(["{ position: { x: 10, y: 20 }, velocity: { x: 1, y: 2 }, mass: 30, bounce: 0.5 }", 6]);

    expect(GenerateInitVar("s3", structs, [101])).toStrictEqual(["{ a: { b: { c: 101 } } }", 1]);
    expect(GenerateInitVar("notExit", structs, [1, 2, 3, 4, 5])).toBeUndefined();
});