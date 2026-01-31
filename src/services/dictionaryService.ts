import DictionaryModel from "@/domain/entities/Dictionary";
import { dictionaryItems, DictionaryItem } from "@/data/dictionaryData";

const USE_API = true;

/**
 * Convert API response to DictionaryItem
 */
function convertApiToDictionaryItem(item: any): DictionaryItem {
  return {
    id: item.id,
    word: item.content || item.word,
    category: item.category || "General", // Map category if available or default
    videoUrl: item.videos_url || item.videoUrl,
    imageUrl: item.images_url || item.imageUrl,
    views: item.view_count || item.views || 0,
    status: item.is_active ? "published" : "draft",
  };
}

/**
 * Convert DictionaryItem to API payload
 */
function convertItemToApiPayload(data: any): any {
  return {
    content: data.word, // Map word -> content
    description: data.description || "",
    topic_id: data.topicId || 1, // Default topic if not provided
    vocabulary_type: "WORD", // Default type
    images_url: data.imageUrl, // Map imageUrl -> images_url
    videos_url: data.videoUrl, // Map videoUrl -> videos_url
    is_private: data.isPrivate ? 1 : 0,
    is_active: data.status === "published" ? 1 : 0,
  };
}

export const fetchAllWords = async (query?: any): Promise<DictionaryItem[]> => {
  if (USE_API) {
    try {
      // Map frontend query 'q' to backend 'content' if needed (handled in Entity now)
      const res = await DictionaryModel.getAllWords(query);
      if (Array.isArray(res)) return res.map(convertApiToDictionaryItem);
      if (res?.data && Array.isArray(res.data))
        return res.data.map(convertApiToDictionaryItem);
      return [];
    } catch (error) {
      console.error("Error fetching words:", error);
      // Fallback to mock
    }
  }

  // Simulate API call (Mock)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dictionaryItems);
    }, 500);
  });
};

export const fetchWordById = async (
  id: number,
): Promise<DictionaryItem | undefined> => {
  if (USE_API) {
    try {
      const res = await DictionaryModel.getWordById(id);
      return convertApiToDictionaryItem(res);
    } catch (error) {
      console.error(`Error fetching word ${id}:`, error);
      // Fallback
    }
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const item = dictionaryItems.find((w) => w.id === id);
      resolve(item);
    }, 300);
  });
};

export const createWord = async (data: any): Promise<DictionaryItem | null> => {
  if (USE_API) {
    const payload = convertItemToApiPayload(data);
    const res = await DictionaryModel.createWord(payload);
    return convertApiToDictionaryItem(res);
  }
  return null;
};

export const updateWord = async (
  id: number,
  data: any,
): Promise<DictionaryItem | null> => {
  if (USE_API) {
    const payload = convertItemToApiPayload(data);
    const res = await DictionaryModel.updateWord(id, payload);
    return convertApiToDictionaryItem(res);
  }
  return null;
};

export const deleteWord = async (id: number): Promise<boolean> => {
  if (USE_API) {
    await DictionaryModel.deleteWord(id);
    return true;
  }
  return false;
};
