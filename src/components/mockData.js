const mockData = {
    tasks: [
        { index: 0, name: 'test-task', due: '2026-06-25', description: 'test-description', groups: ['all'], prioritise: false, done: false },
        { index: 1, name: 'test-task1', due: '2026-06-28', description: '', groups: ['all'], prioritise: false, done: false },
        { index: 2, name: 'test-task2', due: '2026-07-07', description: 'test-description', groups: ['all'], prioritise: true, done: false },
        { index: 3, name: 'test-task3', due: '2026-09-12', description: '', groups: ['all'], prioritise: false, done: true },
        { index: 4, name: 'test-task4', due: '2026-05-12', description: 'Overdue display test', groups: ['all'], prioritise: false, done: false },
    ],
    groups: [
        { name: 'all', tasks: [0, 1, 2, 3, 4], description: 'All tasks are in this group by default'},
        { name: 'prio', tasks: [1, 3], description: 'Priority tasks'},
        { name: 'test-group', tasks: [2], description: 'Test group for demonstration'},
        { name: 'test-description', tasks: [0], description: ''},
    ],
    taskIndexCouter: 5,
    users: [
        {
            username: 'test',
            password: 'test',
            profilePicture: '',
        }
    ]
}

export default mockData;