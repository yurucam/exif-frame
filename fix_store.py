import re

with open('web/src/store.ts', 'r') as f:
    content = f.read()

# Add editPhotoIndex type
content = re.sub(
    r'setNotCroppedMode: \(notCroppedMode: boolean\) => void;\n}',
    r'setNotCroppedMode: (notCroppedMode: boolean) => void;\n\n  editPhotoIndex: number | null;\n  setEditPhotoIndex: (index: number | null) => void;\n}',
    content
)

# Add editPhotoIndex default state
content = re.sub(
    r'return { notCroppedMode };\n    }\),\n\}\)\);',
    r'return { notCroppedMode };\n    }),\n\n  editPhotoIndex: null,\n  setEditPhotoIndex: (editPhotoIndex: number | null) => set({ editPhotoIndex }),\n}));',
    content
)

with open('web/src/store.ts', 'w') as f:
    f.write(content)
