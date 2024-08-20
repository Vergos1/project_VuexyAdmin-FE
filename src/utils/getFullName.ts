export const getFullName = (firstName: string, lastName: string) => {
  const user = {
    name: firstName,
    surname: lastName
  }

  if (user.name && user.surname) {
    return `${firstName} ${lastName}`
  } else {
    return 'User'
  }
}
