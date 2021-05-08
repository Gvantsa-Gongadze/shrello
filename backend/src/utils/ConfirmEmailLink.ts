export const confirmEmailLink = (userId: string) => {
    return `${process.env.FRONTEND_HOST}/reset-password/${userId}`
}