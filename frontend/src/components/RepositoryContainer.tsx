import { IRepository } from "@/infrastructure/interfaces/IRepository";
import RepositoryCard from "./RepositoryCard";
import { RepoContainerProps } from "@/infrastructure/interfaces/Props/RepoContainerProps";

export default function RepositoryContainer({ repos }: RepoContainerProps) {
  return (
    <div className="m-3 border-4 p-3 rounded-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 text-center">
      {repos.map((repository: IRepository) => (
        <RepositoryCard key={repository.id} repositorie={repository}/>
      ))}
    </div>
  );
}
