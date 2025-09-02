export const plainSvg = `
<svg viewBox="0 0 ${'${'}IMAGE_WIDTH} ${'${'}IMAGE_HEIGHT}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <image x="0" y="0" width="${'${'}IMAGE_WIDTH}" height="${'${'}IMAGE_HEIGHT}" xlink:href="${'${'}IMAGE_DATA}" />
</svg>`.trimStart();
