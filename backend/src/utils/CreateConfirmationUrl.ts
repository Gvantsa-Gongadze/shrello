export const createConfirmationUrl = (token: string) => {
    return `http://localhost:3200/email-confirmation/${token}`
}