import translate from "google-translate-api-x";

export async function translateText(
  text: string,
  lang: string
) {
  const result = await translate(text, {
    to: lang
  });

  return result.text;
}