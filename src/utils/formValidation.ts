function validateForm(username: string, password: string) {
  if (username !== import.meta.env.VITE_ADMIN_USERNAME)
    throw new Error("Incorrect username!");
  if (password !== import.meta.env.VITE_ADMIN_PASSWORD)
    throw new Error("Incorrect password!");

  return true;
}

export default validateForm;
