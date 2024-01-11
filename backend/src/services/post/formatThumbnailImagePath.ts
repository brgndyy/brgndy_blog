const formatThumbnailImagePath = (imagePath: string) => {
  const parts = imagePath.split('images/');
  if (parts.length > 1) {
    return 'images/' + parts[1];
  } else {
    return imagePath;
  }
};

export default formatThumbnailImagePath;
