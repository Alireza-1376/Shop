import { ProfileType, UserInfoType } from "@/types/auth";

export async function getUserInfo() {
    const response = await fetch("http://localhost:4000/auth/user-info", {
        method: "GET",
        credentials: "include"
    })

    const data: UserInfoType = await response.json()
    return data;
}

export async function getProfileData(id: string) {
    const response = await fetch(`http://localhost:4000/auth/profile/${id}`, {
        method: "GET",
    });
    const data: ProfileType = await response.json()
    return data;
}