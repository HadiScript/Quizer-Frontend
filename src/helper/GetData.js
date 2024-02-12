export const gettingData = (text, from) => {
  // alert(from);
  if (!text) {
    return "Question Deleted";
  }
  let str1 = text.length > 20 ? text.substring(0, from === "page" ? 100 : 20) + "..." : text;

  console.log(str1);

  return str1.replace(/h1|h2|h3|h4|h5|h6/g, "p");
};
