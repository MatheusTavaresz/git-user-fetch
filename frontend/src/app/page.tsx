"use client";
import React, { useState, FormEvent } from "react";
import {
  fetchUserOnGit,
  getUserRepositories,
} from "@/infrastructure/utils/api";
import UserProfile from "@/components/UserProfile"; 
import RepositoryContainer from "@/components/RepositoryContainer";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const userResponse = await fetchUserOnGit(username);
      if (!userResponse.ok) {
        throw new Error("Failed to find user.");
      }
      const userData = await userResponse.json();
      setUserData(userData);

      const reposResponse = await getUserRepositories(username);

      const reposData = await reposResponse.json();
      setRepos(reposData);
    } catch (error) {
      console.error(error);
      alert("Não foi possivel buscar os dados na API, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className="flex place-content-center my-2">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
          <button className="border-4" type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
      {userData && <UserProfile userData={userData} />}
      {repos.length > 0 && <RepositoryContainer repos={repos} />}
    </div>
  );
}
