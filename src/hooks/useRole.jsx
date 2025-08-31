import { useAuth } from "@/providers/AuthProvider";

const useRole = () => {
    const { user } = useAuth();

    const isAdmin = user?.ROLE === "admin";
    const isDeveloper = user?.ROLE === "developer";
    const isUser = user?.ROLE === 'user';

    return {
        isAdmin,
        isDeveloper,
        isUser
    };
};

export default useRole;
