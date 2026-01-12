import DictionaryModel from "@/src/model/Dictionary";
import { dictionaryItems, DictionaryItem } from "@/src/data/dictionaryData";

const USE_API = true;

export async function fetchAllWords(query?: any): Promise<DictionaryItem[]> {
  if (!USE_API) return dictionaryItems;

  try {
    const response = await DictionaryModel.getAllWords(query);
    // Assuming response structure matches or needs conversion
    // Simplify for now assuming direct match or 'data' wrapper
    const data = response.data || response;
    return Array.isArray(data) ? data : dictionaryItems;
  } catch (error) {
    console.error("Error fetching words:", error);
    return dictionaryItems;
  }
}

export async function fetchWordById(
  id: number
): Promise<DictionaryItem | undefined> {
  if (!USE_API) return dictionaryItems.find((w) => w.id === id);

  try {
    const response = await DictionaryModel.getWordById(id);
    return (response.data || response) as DictionaryItem;
  } catch (error) {
    console.error("Error fetching word:", error);
    return dictionaryItems.find((w) => w.id === id);
  }
}

export async function createWord(data: any) {
  return await DictionaryModel.createWord(data);
}

export async function updateWord(id: number, data: any) {
  return await DictionaryModel.updateWord(id, data);
}

export async function deleteWord(id: number) {
  return await DictionaryModel.deleteWord(id);
}
