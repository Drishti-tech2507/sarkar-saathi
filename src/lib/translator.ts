export async function translateText(
    text: string,
    language: string
  ) {
    if (language === "en")
      return text;
  
    const res = await fetch(
      "/api/translate",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          text,
          language,
        }),
      }
    );
  
    const data =
      await res.json();
  
    return data.translatedText;
  }