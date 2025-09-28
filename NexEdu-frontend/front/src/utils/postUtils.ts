export const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readTime = Math.ceil(words / wordsPerMinute);
  return readTime < 1 ? 1 : readTime;
};

export const generateDefaultTags = (): string[] => {
  return ["Backend", "API"];
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
