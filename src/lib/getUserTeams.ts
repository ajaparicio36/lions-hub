import { db } from "./firebase-admin";
import { Team } from "./teams";

export async function getUserTeams(userId: string): Promise<Team[]> {
  const teamsRef = db.collection("teams");
  const snapshot = await teamsRef
    .where("userUids", "array-contains", userId)
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.teamName || "",
      description: data.description || "",
      gameName: data.gameName || "",
      userUids: data.userUids || [],
      photo: data.photo || "",
    };
  });
}
