export type UserRole = 'student' | 'organizer'

export interface AppUser {
  id: string
  name: string
  email: string
  role: UserRole
}

export const users: AppUser[] = [
  { id: 'stu-1', name: 'Aditi Rao (Student)', email: 'student@campus.com', role: 'student' },
  { id: 'org-1', name: 'Rohan Verma (Organizer)', email: 'organizer@campus.com', role: 'organizer' },
]

export function getUserById(id: string): AppUser | undefined {
  return users.find((user) => user.id === id)
}
