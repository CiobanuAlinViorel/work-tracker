"use client";

import RegisterDesktop from "@/src/features/authentication/ui/components/RegisterDesktop";
import RegisterMobile from "@/src/features/authentication/ui/components/RegisterMobile";
import useRegisterUser from "@/src/features/authentication/ui/hooks/useRegisterUser";
import useDeviceDimensions from "@/src/shared/hooks/useDeviceDimensions";


export default function RegisterPage() {
    const { isMobile } = useDeviceDimensions();

    const {
        register,
        handleRegister,
        isLoading,
        errors
    } = useRegisterUser();

    return isMobile ?
        <RegisterMobile
            register={register}
            handleRegister={handleRegister}
            isLoading={isLoading}
            errors={errors}
        />

        :

        <RegisterDesktop
            register={register}
            handleRegister={handleRegister}
            isLoading={isLoading}
            errors={errors}
        />;
}