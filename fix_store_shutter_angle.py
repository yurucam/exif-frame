import re

with open('web/src/store.ts', 'r') as f:
    content = f.read()

# Add shutterAngleMode type
content = re.sub(
    r'editPhotoIndex: number \| null;\n  setEditPhotoIndex: \(index: number \| null\) => void;\n}',
    r'editPhotoIndex: number | null;\n  setEditPhotoIndex: (index: number | null) => void;\n\n  shutterAngleMode: boolean;\n  setShutterAngleMode: (shutterAngleMode: boolean) => void;\n}',
    content
)

# Add shutterAngleMode state
content = re.sub(
    r'editPhotoIndex: null,\n  setEditPhotoIndex: \(editPhotoIndex: number \| null\) => set\(\{ editPhotoIndex \}\),\n\}\)\);',
    r'editPhotoIndex: null,\n  setEditPhotoIndex: (editPhotoIndex: number | null) => set({ editPhotoIndex }),\n\n  shutterAngleMode: localStorage.getItem("shutterAngleMode") === "true",\n  setShutterAngleMode: (shutterAngleMode: boolean) =>\n    set(() => {\n      localStorage.setItem("shutterAngleMode", shutterAngleMode.toString());\n      return { shutterAngleMode };\n    }),\n}));',
    content
)

with open('web/src/store.ts', 'w') as f:
    f.write(content)
