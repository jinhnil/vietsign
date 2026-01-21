import { dictionaryItems, DictionaryItem } from "@/data/dictionaryData";

export const fetchAllWords = async (): Promise<DictionaryItem[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dictionaryItems);
    }, 500);
  });
};

export const fetchWordById = async (
  id: number,
): Promise<DictionaryItem | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const item = dictionaryItems.find((w) => w.id === id);
      resolve(item);
    }, 300);
  });
};
