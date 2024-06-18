import React, { useState } from 'react';
import { RepositoryCardProps } from "@/infrastructure/interfaces/Props/RepositoryProps";
import { deleteUserRepository } from "@/infrastructure/utils/api";

export default function RepositoryCard({ repositorie }: RepositoryCardProps) {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDeleteClick = async () => {
    await deleteUserRepository(repositorie.id);
    setIsDeleted(true); 
  };

  if (isDeleted) {
    return null; 
  }

  return (
    <div className="bg-red-400 w-90 p-2 rounded-md items-center shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{repositorie.name}</div>
        <p className="text-gray-700 text-base">
          {repositorie.description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {repositorie.language}
        </span>
      </div>
      <div className="text-sm">
        <p className="text-gray-900">Criado em: {repositorie.createdAt.toString().slice(0, 10)}</p>
      </div>
      <button onClick={handleDeleteClick} className="p-2 bg-red-500 text-white rounded-md mt-2">
        Excluir
      </button>
    </div>
  );
}
