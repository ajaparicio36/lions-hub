"use server";

import { db } from "./firebase-admin";
import { Team } from "./teams";

export const getTeamRef = async (teamData: Omit<Team, "id">) => {
  "use server";
  const teamRef = await db.collection("teams").add({
    ...teamData,
    photo: null, // We'll update this after uploading the photo
  });

  return teamRef;
};
