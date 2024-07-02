import { RegistrationFormData } from "./pages/Registration";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: RegistrationFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/registration`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};
