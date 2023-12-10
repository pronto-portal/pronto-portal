const extractJsonObjectFromString = (str: string): object | null => {
  const jsonPattern = /{.*}$/s;
  const match = str.match(jsonPattern);
  if (match) {
    try {
      const jsonObject = JSON.parse(match[0]);
      console.log("JSON OBJECT", jsonObject);
      return jsonObject;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  } else {
    console.error("No JSON object found in the string");
    return null;
  }
};

export default extractJsonObjectFromString;
