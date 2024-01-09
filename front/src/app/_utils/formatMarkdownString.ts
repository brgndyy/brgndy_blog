const formatMarkdownBodyContent = (content: string) => {
  let formattedMarkdownBodyContent = content.replace(/\\n/g, '\n');

  formattedMarkdownBodyContent = formattedMarkdownBodyContent.replace(/\\`/g, '`');

  return formattedMarkdownBodyContent;
};

export default formatMarkdownBodyContent;
