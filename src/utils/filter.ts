import type { VocabularyItem } from "../data/vocabulary";

export function filterVocabularyItems(
  items: VocabularyItem[],
  query: string,
  categoryId: string = "all",
) {
  const normalizedQuery = query.trim().toLowerCase();

  return items.filter((item) => {
    const matchesCategory = categoryId === "all" || item.categoryId === categoryId;
    const searchableText = [
      item.word,
      item.chinese,
      item.categoryChinese,
      item.categoryEnglish,
      item.example,
      item.exampleChinese,
    ]
      .join(" ")
      .toLowerCase();

    return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
  });
}
