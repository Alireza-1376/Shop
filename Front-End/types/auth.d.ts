export type PhoneNumberType = {
    phoneNumber: string
}

export type OtpType = {
    otp: string
}

export type SignupType = {
    username: string,
    email: string,
    password: string,
    phoneNumber?: string
}

export type PasswordType = {
    password: string
}

export type RecoveryPassword = {
    phoneNumber: string,
    password: string,
    confirmPassword: string
}
export type UserInfoType = {
    userId: string
    role: string,
    username: string,
    phoneNumber: string
}

export type ProfileType = {
    _id: string,
    username: string,
    email: string,
    phoneNumber: string,
    role: string,
    createdAt: string,
}

export type EditProfile = {
    userId: string,
    username: string,
    email: string,
    phoneNumber: string,
}