/**
 * SVG 문자열에서 viewBox의 가로와 세로 길이를 추출합니다.
 * @param svgString - SVG 문자열
 * @returns viewBox의 가로와 세로 길이를 담은 객체
 */
export function getViewBoxDimensions(svgString: string) {
  // viewBox 속성을 찾는 정규표현식
  // viewBox="..." 또는 viewBox='...' 형태를 모두 처리
  const viewBoxRegex = /viewBox\s*=\s*["']([^"']+)["']/i;
  const match = svgString.match(viewBoxRegex);

  if (!match || !match[1]) {
    throw new Error('viewBox 속성을 찾을 수 없습니다.');
  }

  // viewBox 값 파싱 (형식: "min-x min-y width height")
  const viewBoxValue = match[1].trim();
  const values = viewBoxValue.split(/\s+/).map(Number);

  if (values.length !== 4 || values.some(isNaN)) {
    throw new Error('viewBox 형식이 올바르지 않습니다.');
  }

  const [minX, minY, width, height] = values;

  return {
    minX,
    minY,
    width,
    height,
  };
}
