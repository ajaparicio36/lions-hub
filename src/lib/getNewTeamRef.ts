"use server";

import { db } from "./firebase-admin";
import { Team } from "./teams";

export const createNewTeam = async (teamData: Partial<Team> = {}) => {
  const defaultTeamData = {
    name: "",
    description: "",
    gameName: "",
    userUids: [],
    photo: "teams/default.jpg",
    ...teamData,
  };

  const teamRef = await db.collection("teams").add(defaultTeamData);
  const teamDoc = await teamRef.get();

  const team: Team = {
    id: teamRef.id,
    name: teamDoc.get("name"),
    description: teamDoc.get("description"),
    gameName: teamDoc.get("gameName"),
    userUids: teamDoc.get("userUids"),
    photo: teamDoc.get("photo"),
  };

  // Explicitly create a plain object
  return team;
};

export const getTeamRef = async (teamId: string) => {
  if (!teamId) {
    throw new Error("Team ID is required");
  }
  return { id: teamId };
};
