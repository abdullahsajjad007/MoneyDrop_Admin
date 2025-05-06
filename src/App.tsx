import {Toaster} from "@/components/ui/toaster";
import {Toaster as Sonner} from "@/components/ui/sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import AuthContextProvider from "@/contexts/AuthContext";
import {PrivateRoute} from "@/components/auth/PrivateRoute";
import SignIn from "./pages/auth/SignIn";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import DiscountCodes from "./pages/DiscountCodes";
import StickerSubmission from "./pages/StickerSubmission";
import Payments from "./pages/Payments";
import FeesSettings from "./pages/FeesSettings";

const queryClient = new QueryClient();

const protectedRoutes = [
	{path: "/dashboard", element: <Dashboard />},
	{path: "/notifications", element: <Index />},
	{path: "/payments", element: <Payments />},
	{path: "/discount-codes", element: <DiscountCodes />},
	{path: "/users", element: <Users />},
	{path: "/sticker-submission", element: <StickerSubmission />},
	{path: "/fees-settings", element: <FeesSettings />},
	{path: "/profile", element: <Profile />},
];

const App = () => (
	<QueryClientProvider client={queryClient}>
		<AuthContextProvider>
			<TooltipProvider>
				<Toaster />
				<Sonner />
				<BrowserRouter>
					<Routes>
						{/* Public Routes */}
						<Route path="/signin" element={<SignIn />} />
						<Route path="/reset-password" element={<ResetPassword />} />

						{/* Protected Routes */}
						{protectedRoutes.map(({path, element}) => (
							<Route
								key={path}
								path={path}
								element={<PrivateRoute>{element}</PrivateRoute>}
							/>
						))}

						{/* Catch all route - redirect to signin */}
						<Route path="*" element={<Navigate to="/signin" replace />} />
					</Routes>
				</BrowserRouter>
			</TooltipProvider>
		</AuthContextProvider>
	</QueryClientProvider>
);

export default App;
