import GameModel from "@/src/model/Game";
import { getAllGames as getMockGames, GameItem } from "@/src/data/gamesData";

const USE_API = true;

export async function fetchAllGames(query?: any): Promise<GameItem[]> {
  if (!USE_API) return getMockGames();

  try {
    const response = await GameModel.getAllGames(query);
    const data = response.data || response;
    return Array.isArray(data) ? data : getMockGames();
  } catch (error) {
    console.error("Error fetching games:", error);
    return getMockGames();
  }
}

export async function fetchGameById(id: number): Promise<GameItem | undefined> {
  if (!USE_API) return getMockGames().find((g) => g.id === id);

  try {
    const response = await GameModel.getGameById(id);
    return (response.data || response) as GameItem;
  } catch (error) {
    console.error("Error fetching game:", error);
    return getMockGames().find((g) => g.id === id);
  }
}

export async function createGame(data: any) {
  return await GameModel.createGame(data);
}

export async function updateGame(id: number, data: any) {
  return await GameModel.updateGame(id, data);
}

export async function deleteGame(id: number) {
  return await GameModel.deleteGame(id);
}
