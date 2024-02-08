const convertFileNameToSafeFormat = (fileName: string) => {
  return fileName.replace(/[^a-zA-Z0-9.]+/g, '-');
};

export default convertFileNameToSafeFormat;
