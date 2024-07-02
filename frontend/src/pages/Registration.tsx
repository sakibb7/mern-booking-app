import { useForm } from "react-hook-form";
import * as apiClient from "../api-client";
import { useMutation } from "react-query";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export type RegistrationFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Registration() {
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      showToast({ message: "Registration Success!", type: "SUCCESS" });
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
    <div>
      <h2 className="text-3xl font-semibold text-center">Registration</h2>
      <div>
        <form className="flex flex-col gap-6" onSubmit={onSubmit}>
          <div className="">
            <label>
              First Name{" "}
              <input
                type="text"
                className="border border-slate-600"
                {...register("firstName", {
                  required: "This field is required",
                })}
              />
            </label>

            {errors.firstName && <span>{errors.firstName.message}</span>}
          </div>
          <div className="">
            <label>
              Last Name{" "}
              <input
                type="text"
                className="border border-slate-600"
                {...register("lastName", {
                  required: "This field is required",
                })}
              />
            </label>
          </div>
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
            <label>
              Confirm Password{" "}
              <input
                type="password"
                className="border border-slate-600"
                {...register("confirmPassword", {
                  validate: (val) => {
                    if (!val) {
                      return "this field is required";
                    } else if (watch("password") !== val) {
                      return "Your password do not match!";
                    }
                  },
                })}
              />
            </label>
          </div>
          <div className="">
            <button type="submit" className="bg-red-500 py-2 px-4 text-white">
              Create an account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
