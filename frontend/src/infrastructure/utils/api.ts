
export const fetchUserOnGit = async (username: string) => {
  const response = await fetch(`/api/findUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });
  return response;
};

export const getUserProfile = async () => {
  const response = await fetch(`api/get-userProfile`);
  return response;
};

export const getUserRepositories = async (username: string) => {
  const response = await fetch(`api/${username}/repositories`, {
    method: "GET"
  });
  return response;
};

export const deleteUserRepository = async (id: number) => {
  const response = await fetch(`/api/repositories/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    console.log(`Repositório com id ${id} deletado com sucesso.`);
  } else {
    console.error(`Falha ao deletar o repositório com id ${id}.`);
  }
};
