/**
 * 안전하게 사칙연산을 평가하는 함수.
 */
export function safeArithmeticEval(input: string) {
  // 숫자, 공백, 소수점, 괄호, 사칙연산자만 허용
  const allowedPattern = /^[0-9+\-*/().\s]+$/;
  if (!allowedPattern.test(input)) {
    throw new Error('사칙연산 외의 문자가 포함되어 있습니다.');
  }
  try {
    const result = new Function('return ' + input)();
    if (typeof result !== 'number' || !isFinite(result)) {
      throw new Error('유효한 산술식이 아닙니다.');
    }
    return result;
  } catch (e) {
    console.error(e);
    throw new Error('산술식 평가에 실패했습니다.');
  }
}
