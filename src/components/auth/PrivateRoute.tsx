// import {Navigate, useLocation} from "react-router-dom";
// import {AuthContext} from "@/contexts/AuthContext";
// import {useContext, useEffect} from "react";
// import {isAuthenticated} from "@/utils";
// import {getLoginToken} from "@/storage";

// export const PrivateRoute = ({children}: {children: React.ReactNode}) => {
// 	const {user, logout} = useContext(AuthContext);

// 	useEffect(() => {
// 		const checkTokenValidity = () => {
// 			const token = getLoginToken();
// 			if (!token || !isAuthenticated()) {
// 				logout();
// 				// window.location.href = "/signin";
// 			}
// 		};

// 		// Initial check
// 		checkTokenValidity();

// 		// Set up an interval to check token validity periodically
// 		const intervalId = setInterval(checkTokenValidity, 5 * 60 * 1000); // Check every 5 minutes

// 		// Clean up the interval on component unmount
// 		return () => clearInterval(intervalId);
// 	}, []);

// 	// console.log(user, "in privateroute");

// 	const location = useLocation();

// 	// if (loading) {
// 	//   return <div>Loading...</div>;
// 	// }

// 	if (!isAuthenticated) {
// 		return <Navigate to="/signin" state={{from: location}} replace />;
// 	}

// 	return <>{children}</>;
// };

import {Navigate, useLocation} from "react-router-dom";
import {AuthContext} from "@/contexts/AuthContext";
import {useContext, useEffect} from "react";
import {isAuthenticated} from "@/utils";
import {getLoginToken} from "@/storage";

export const PrivateRoute = ({children}: {children: React.ReactNode}) => {
	const {user, logout} = useContext(AuthContext);
	const location = useLocation();

	useEffect(() => {
		const checkTokenValidity = () => {
			const token = getLoginToken();

			// If token is missing or invalid, log the user out
			if (!token || !isAuthenticated()) {
				logout();
			}
		};

		// Initial check on component mount
		checkTokenValidity();

		// Set up an interval to check token validity periodically
		const intervalId = setInterval(checkTokenValidity, 5 * 60 * 1000); // Check every 5 minutes

		// Clean up the interval on component unmount
		return () => clearInterval(intervalId);
	}, [logout]);

	if (!isAuthenticated()) {
		return <Navigate to="/signin" state={{from: location}} replace />;
	}

	return <>{children}</>;
};
