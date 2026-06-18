const mockData = {
    tasks: [
        { name: 'test-task', due: '2026-06-25', description: 'test-description', groups: ['all'] },
        { name: 'test-task1', due: '2026-06-28', description: '', groups: ['all'] },
        { name: 'test-task2', due: '2026-07-07', description: 'test-description', groups: ['all'] },
        { name: 'test-task3', due: '2026-09-12', description: '', groups: ['all'] },
    ],
    groups: [
        { name: 'all', tasks: ['test-task', 'test-task1', 'test-task2', 'test-task3'] },
        { name: 'prio', tasks: [] },
        { name: 'test-group', tasks: [] },
    ]
}

export default mockData;