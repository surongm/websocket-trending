export default {
    preset: 'ts-jest',
    testEnvironment: "node",
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
};
