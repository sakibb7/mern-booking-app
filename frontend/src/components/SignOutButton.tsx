import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";

function SignOutButton() {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const navigate = useNavigate();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Signed Out!", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <button
      onClick={handleClick}
      className="text-white bg-green-500 px-3 py-3 ml-4"
    >
      Sing Out
    </button>
  );
}

export default SignOutButton;
