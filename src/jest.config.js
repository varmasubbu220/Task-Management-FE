export default {
    
    extensionsToTreatAsEsm: ['.jsx'],
    testEnvironment: 'node',
    transform: {},
    transformIgnorePatterns: [
      '/node_modules/(?!(moduleNameToTransform|anotherModuleName)/)',
    ],
  };
  