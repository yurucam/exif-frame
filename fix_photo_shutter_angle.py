import re

with open('web/src/core/photo.ts', 'r') as f:
    content = f.read()

replacement = """  public get exposureTime(): string {
    let exposureTime = overrideExifMetadata()?.exposureTime || this.metadata.exposureTime || '';
    if (localStorage.getItem('shutterAngleMode') === 'true' && exposureTime) {
      // Calculate shutter angle assuming 24fps
      const match = exposureTime.match(/^1\\/(\\d+(?:\\.\\d+)?)$/);
      if (match) {
        const speed = parseFloat(match[1]);
        const angle = (24 * 360) / speed;
        return `${Math.round(angle)}°`;
      }
    }
    return exposureTime;
  }"""

replacement = replacement.replace('\\', '\\\\')

content = re.sub(
    r"  public get exposureTime\(\): string \{\n    return overrideExifMetadata\(\)\?\.exposureTime \|\| this\.metadata\.exposureTime \|\| '';\n  \}",
    replacement,
    content
)

with open('web/src/core/photo.ts', 'w') as f:
    f.write(content)
