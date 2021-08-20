const app = require('../src/Zfile');
test('folder test', () => {
  expect(app.folder('.temp')).toBeFalsy();
  expect(app.folder('.temp', true)).toBeTruthy();
  expect(app.folder('.temp')).toBeTruthy();
});
test('folders test', () => {
  const folders = ['.git', '.idea', '.temp', '__tests__', 'bin', 'coverage', 'example', 'node_modules', 'src'];
  expect(app.folders('.')).toEqual(expect.arrayContaining(folders));
});
test('files test', () => {
  const files = ['Zfile.js'];
  expect(app.files('src')).toEqual(expect.arrayContaining(files));
});
test('file test', () => {
  expect(app.file('.temp/test.txt')).toBeFalsy();
  return expect(app.file('.temp/test.txt', true)).toBeTruthy();
});
test('write test', () => {
  return expect(app.write('.temp/test.txt', 'test')).resolves.toBeTruthy();
});
test('read test', () => {
  return expect(app.read('.temp/test.txt')).resolves.toBe('test');
});
test('replace test', () => {
  return expect(app.replace('.temp/test.txt', 'test', 'ok')).resolves.toBeTruthy();
});
test('reads test', () => {
  return expect(app.reads(['.temp/test.txt', '.temp/test.txt'])).resolves.toEqual(expect.arrayContaining(['ok', 'ok']));
});
test('dummy test', () => {
  return expect(app.dummy(240, 80, '#000000', '.temp/dummy.jpg')).resolves.toBeTruthy();
});

