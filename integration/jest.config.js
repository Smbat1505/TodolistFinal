module.exports = {
    preset: 'jest-puppeteer',
    testRegex: './*\\.test\\.js$',
    setupFilesAfterEnv: ['./setupTests.js'],
    // testTimeout: 50000  // раскоментировать если падает ошибка о нехватке времени
};