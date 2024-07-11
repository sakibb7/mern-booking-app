import { useForm } from "react-hook-form";
import * as apiClient from "../api-client";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export type SignInFormData = {
  email: string;
  password: string;
};

function SignIn() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const { showToast } = useAppContext();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Sign In Success!", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="">
        <label>
          Email{" "}
          <input
            type="email"
            className="border border-slate-600"
            {...register("email", {
              required: "This field is required",
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </label>
      </div>
      <div className="">
        <label>
          Password{" "}
          <input
            type="password"
            className="border border-slate-600"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be greater than 6 word",
              },
            })}
          />
        </label>
      </div>

      <div className="">
        <button type="submit" className="bg-red-500 py-2 px-4 text-white">
          Login
        </button>
      </div>
    </form>
  );
}

export default SignIn;
