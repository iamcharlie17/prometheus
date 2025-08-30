import { authStore } from "@/providers/AuthProvider";

const useRole = () => {
    const { user } = authStore();

    const isAdmin = user?.role === "admin";
    const isDeveloper = user?.role === "developer";
    const isUser = user?.role === 'user';

    return {
        isAdmin,
        isDeveloper,
        isUser
    };
};

export default useRole;
