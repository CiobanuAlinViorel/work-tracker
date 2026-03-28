import { FieldErrors, UseFormRegister } from "react-hook-form";

interface RegisterComponent {
    register: UseFormRegister<{
        email: string;
        username: string;
        password: string;
        passwordConfirmation: string;
    }>;
    handleRegister: () => void;
    isLoading: boolean
    errors: FieldErrors<{
        email: string;
        username: string;
        password: string;
        passwordConfirmation: string;
    }>
}

export default RegisterComponent;