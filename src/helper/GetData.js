export const gettingData = (text, from) => {
  if (!text) {
    return "Question Deleted";
  }

  if (text.includes("pre")) {
    return "code";
  }

  let str1 = text.replace(/h1|h2|h3|h4|h5|h6/g, "p");

  return str1.length > 20 ? str1.substring(0, from === "page" ? 200 : 100) + "..." : str1;
};
