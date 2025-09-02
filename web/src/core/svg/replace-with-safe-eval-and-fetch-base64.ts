import { arrayBufferToBase64 } from './arraybuffer-to-base64';
import { safeArithmeticEval } from './safe-arithmetic-eval';

/**
 * 문자열 내의 `${...}` 패턴을 찾아 처리하는 비동기 함수.
 */
export async function replaceWithSafeEvalAndFetchBase64(input: string) {
  // `${...}` 패턴을 모두 찾기 위한 정규표현식
  const regex = /\$\{([^}]+)\}/g;
  const matches = [];
  let match;
  while ((match = regex.exec(input)) !== null) {
    matches.push(match);
  }

  // 각 매칭에 대해 비동기적으로 처리
  const replacements = await Promise.all(
    matches.map(async (match) => {
      const content = match[1].trim();

      // 사칙연산식인지 판단 (숫자, 공백, 소수점, 괄호, +, -, *, / 만 포함)
      const arithmeticPattern = /^[0-9+\-*/().\s]+$/;
      if (arithmeticPattern.test(content)) {
        try {
          const result = safeArithmeticEval(content);
          // 결과 숫자를 문자열로 변환하여 반환
          return String(result);
        } catch (error: unknown) {
          console.error(error);
          return match[0]; // 평가 실패 시 원본 그대로 반환
        }
      } else {
        // URL-like 이면 fetch 처리, 그렇지 않으면 리터럴로 그대로 사용
        const isHttpUrl = /^https?:\/\//i.test(content);
        const isDataUrl = /^data:/i.test(content);
        if (isDataUrl) {
          // 이미 data URL 이면 그대로 반환 (추가 fetch 불필요)
          return content;
        }
        if (!isHttpUrl) {
          // URL이 아니면 그냥 리터럴 텍스트로 취급
          return content;
        }
        try {
          const response = await fetch(content);
          if (!response.ok) {
            throw new Error('네트워크 응답이 올바르지 않습니다.');
          }
          // 응답 헤더에서 Content-Type 획득 (예: image/png)
          const contentType = response.headers.get('content-type') || '';
          // 응답 데이터를 ArrayBuffer로 읽음 (바이너리 데이터)
          const buffer = await response.arrayBuffer();
          const base64String = arrayBufferToBase64(buffer);
          // 만약 응답이 이미지라면 data URL 형식으로 반환
          if (contentType.startsWith('image/')) {
            return `data:${contentType};base64,${base64String}`;
          } else {
            throw new Error('지원하지 않는 컨텐츠 타입입니다.');
          }
        } catch (error: unknown) {
          console.error(error);
          return match[0]; // fetch 실패 시 원본 그대로 반환
        }
      }
    })
  );

  // 원본 문자열에서 치환: 뒤에서부터 교체하면 인덱스 문제가 발생하지 않음
  let outputStr = input;
  for (let i = matches.length - 1; i >= 0; i--) {
    const { index } = matches[i]; // 매칭된 시작 인덱스
    const fullMatch = matches[i][0]; // 예: "${...}"
    outputStr = outputStr.slice(0, index) + replacements[i] + outputStr.slice(index + fullMatch.length);
  }

  return outputStr;
}
