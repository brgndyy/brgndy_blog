import convertFileNameToSafeFormat from '../convertFileNameToSafeFormat';
describe('알파벳, 숫자, 마침표를 제외한 모든 문자를 하이픈(-)으로 대체해주는 convertFileNameToSafeFormat 유틸 함수에 대한 테스트 코드 작성', () => {
  it('정상적으로 알파벳, 숫자, 마침표만 들어온 파일명이라면 해당 파일명을 그대로 반환한다. ', () => {
    const fileName = 'exampleFile123.jpg';
    const result = convertFileNameToSafeFormat(fileName);
    expect(result).toBe('exampleFile123.jpg');
  });

  it('띄어쓰기나 특수문자가 파일명에 포함되어있다면 하이픈(-)으로 그만큼 대체한다.', () => {
    const fileName = 'example file @ 2024.pdf';
    const result = convertFileNameToSafeFormat(fileName);
    expect(result).toBe('example-file-2024.pdf');
  });

  it('빈문자열이라면 그대로 빈 문자열을 반환한다.', () => {
    const fileName = '';
    const result = convertFileNameToSafeFormat(fileName);
    expect(result).toBe('');
  });

  it('연속적인 특수문자가 파일명에 들어가있다면, 단일 하이픈으로 대체한다.', () => {
    const fileName = 'bad**&^%%file$name.txt';
    const result = convertFileNameToSafeFormat(fileName);
    expect(result).toBe('bad-file-name.txt');
  });

  it('영어가 아닌 다른 외국어나, 이모지가 입력됐을시에 하이픈으로 대체한다. 연속적이라면 단일 하이픈으로 대체한다.', () => {
    const fileName = 'こんdちは👋.txt';
    const result = convertFileNameToSafeFormat(fileName);
    expect(result).toBe('-d-.txt');
  });
});
