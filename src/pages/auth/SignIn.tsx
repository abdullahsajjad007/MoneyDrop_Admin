import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
// import {useAuth} from "@/contexts/AuthContext";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent} from "@/components/ui/card";
import {useToast} from "@/hooks/use-toast";
import {Eye, EyeOff} from "lucide-react";
import {useLogin} from "@/hooks/auth";
import {LoginProps} from "@/interface";
import {useIsMutating} from "@tanstack/react-query";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	// const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const {toast} = useToast();
	const {mutate, isSuccess, reset} = useLogin();

	//  "email": "sam@example.com",
	//   "password": "Test@1234"
	const isLoading = useIsMutating();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const FormData = {email, password};
		console.log(FormData)

		try {
			// mutate(FormData as LoginProps);

			mutate(FormData as LoginProps, {
				onSuccess: () => {
					navigate("/dashboard");
				},
			});
		} catch (error) {
			toast({
				title: "Error",
				description: "Invalid credentials",
				variant: "destructive",
			});
		} finally {
			// setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-primary flex items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardContent className="pt-6 pb-8 bg-white">
					<div className="text-center mb-8">
						<h1 className="text-2xl font-semibold text-gray-700">
							Admin Login
						</h1>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="space-y-2">
							<label htmlFor="email" className="text-sm font-medium">
								Email
							</label>
							<Input
								className="outline-none"
								id="email"
								type="email"
								placeholder="Enter your email"
								value={email}
								onChange={e => setEmail(e.target.value)}
								required
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="password" className="text-sm font-medium">
								Password
							</label>
							<div className="relative">
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									placeholder="Enter your password"
									value={password}
									onChange={e => setPassword(e.target.value)}
									required
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
								>
									{showPassword ? (
										<EyeOff className="h-4 w-4" />
									) : (
										<Eye className="h-4 w-4" />
									)}
								</button>
							</div>
						</div>

						<Button
							type="submit"
							className="w-full bg-primary hover:bg-primary-hover"
							// disabled={isLoading > 0}
							loading={isLoading > 0}
						>
							Login to your account
						</Button>
					</form>

					<div className="mt-6 text-center">
						<Link
							to="/reset-password"
							className="text-sm text-primary hover:underline"
						>
							Forgot your password?
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default SignIn;
