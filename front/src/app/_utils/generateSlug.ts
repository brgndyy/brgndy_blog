const generateSlug = (title: string) => {
  console.log('title :', title);
  return title.replace(/[ ?!]/g, '-');
};

export default generateSlug;
