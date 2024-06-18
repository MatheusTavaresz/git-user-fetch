import { UserInfoProps } from "@/infrastructure/interfaces/Props/UserInfoProps";

export default function UserProfile({ userData}: UserInfoProps){
    return(
        <div className="flex justify-center text-center my-3">
            <p className="font-extrabold text-lg">{userData.username}</p>
        </div>
    )
}
