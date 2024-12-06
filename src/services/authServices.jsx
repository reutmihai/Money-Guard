const BASE_URL = "https://wallet.b.goit.study/api/auth";

// export const fetchCurrentUser = async () => {
//     try {
//         const response = await fetch("https://wallet.b.goit.study/api/users/current", {
//             method: "GET",
//             credentials: "include",
//         });
//         if (!response.ok) {
//             throw new Error("User not authenticated");
//         }
//         return await response.json();
//     } catch (error) {
//         console.error("Error fetching user:", error);
//         return null;
//     }
// };

export const signUp = async (userData) => {
    try {
        const response = await fetch(`${BASE_URL}/sign-up`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error("Failed to register. Please try again.");
        }

        return await response.json();
    } catch (error) {
        console.error("Sign Up Error:", error);
        throw error;
    }
};

export const signIn = async (credentials) => {
    try {
        const response = await fetch(`${BASE_URL}/sign-in`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error("Failed to log in. Please check your credentials.");
        }

        return await response.json();
    } catch (error) {
        console.error("Sign In Error:", error);
        throw error;
    }
};
