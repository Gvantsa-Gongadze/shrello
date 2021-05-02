export interface Board {
    
}

export interface AuthUser {
    _id: string
    boards:  Board[]
    email: string
    firstName: string
    lastName: string
}