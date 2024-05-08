const overrideExifMetadata = () => {
  const overridableMetadata: { [key: string]: string }[] = JSON.parse(localStorage.getItem('overridableMetadata') || '[]');
  const overrideMetadataIndex: number | null = JSON.parse(localStorage.getItem('overrideMetadataIndex') || 'null');
  const metadata = overrideMetadataIndex == null ? null : overridableMetadata.length > overrideMetadataIndex ? overridableMetadata[overrideMetadataIndex] : null;
  return metadata;
};

export default overrideExifMetadata;
