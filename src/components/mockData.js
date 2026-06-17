import { describe } from "vitest";

const mockData = {
    tasks:[ 
        {
            name: 'test-task',
            due: '2026-06-25',
            description: 'test-description',
            groups: [],
        },{
            name: 'test-task1',
            due: '2026-06-28',
            description: '',
            groups: [],
        },{
            name: 'test-task2',
            due: '2026-07-07',
            description: 'test-description',
            groups: [],
        },{
            name: 'test-task3',
            due: '2026-09-12',
            description: '',
            groups: [],
        },
    ],
    groups: [
        {name: 'prio', tasks: [
            {
                name: 'test-task3',
                due: '2026-09-12',
                description: '',
                groups: [],
            }
        ]},
        {name: 'test-group', tasks: []},
    ]
}

export default mockData;