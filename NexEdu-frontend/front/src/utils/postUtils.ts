export const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readTime = Math.ceil(words / wordsPerMinute);
  return readTime < 1 ? 1 : readTime;
};


export const getCurrentDateString = (): string => {
  return new Date().toISOString().split("T")[0];
};

export const generateExcerpt = (
  content: string,
  maxLength: number = 150
): string => {
  return content.length > maxLength
    ? content.substring(0, maxLength) + "..."
    : content;
};

export const generateMarkdownExcerpt = (
  content: string,
  maxLength: number = 150
): string => {
  const plainText = content
    .replace(/#{1,6}\s+/g, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\n+/g, " ")
    .trim();

  return plainText.length > maxLength
    ? plainText.substring(0, maxLength) + "..."
    : plainText;
};
