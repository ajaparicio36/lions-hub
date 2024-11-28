import { db } from "./firebase-admin";
import { Team } from "./teams";

export async function getUserTeamById(
  userId: string,
  teamId: string
): Promise<Team | null> {
  const teamRef = db.collection("teams").doc(teamId);
  const doc = await teamRef.get();

  if (!doc.exists) {
    console.log("No such document!");
    return null;
  }

  const data = doc.data();

  // Check if the user is part of the team
  if (!data?.userUids.includes(userId)) {
    console.log("User is not part of this team");
    return null;
  }

  return {
    id: doc.id,
    teamName: data?.teamName || "",
    description: data?.description || "",
    gameName: data?.gameName || "",
    userUids: data?.userUids || [],
  };
}
