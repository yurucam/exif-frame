export const convertURLtoFile = async (url: string): Promise<File> => {
  const response = await fetch(url);
  const data = await response.blob();
  const ext = url.split('.').pop(); // url 구조에 맞게 수정할 것
  const filename = url.split('/').pop(); // url 구조에 맞게 수정할 것
  const metadata = { type: `image/${ext}` };
  return new File([data], filename!, metadata);
};
