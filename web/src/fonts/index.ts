enum Font {
  Digital7 = 'digital-7',
}

// Load all fonts from the fonts public/fonts folder
Object.values(Font).forEach((font) =>
  new FontFace(font, `url(fonts/${font}.ttf)`).load().then((loadedFont) => document.fonts.add(loadedFont))
);

export default Font;
