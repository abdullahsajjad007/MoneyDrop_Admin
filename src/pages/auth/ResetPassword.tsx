import {useState} from "react";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent} from "@/components/ui/card";
import {useToast} from "@/hooks/use-toast";

const ResetPassword = () => {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const {toast} = useToast();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			// This would be replaced with actual API call
			// console.log("Reset password for:", email);

			toast({
				title: "Success",
				description:
					"If an account exists with this email, you will receive a password reset link.",
			});

			setEmail("");
		} catch (error) {
			toast({
				title: "Error",
				description: "Something went wrong. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-primary flex items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardContent className="pt-6 pb-8 bg-white">
					<div className="text-center mb-8">
						<h1 className="text-2xl font-semibold text-gray-700">
							Reset your password
						</h1>
						<p className="text-sm text-gray-500 mt-2">
							We will send you a password reset link if we find the email you
							provide associated to an existing account.
						</p>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="space-y-2">
							<label htmlFor="email" className="text-sm font-medium">
								Email
							</label>
							<Input
								id="email"
								type="email"
								placeholder="Enter your email"
								value={email}
								onChange={e => setEmail(e.target.value)}
								required
							/>
						</div>

						<Button
							type="submit"
							className="w-full bg-primary hover:bg-primary-hover"
							disabled={isLoading}
						>
							Send Reset Email
						</Button>
					</form>

					<div className="mt-6 text-center">
						<Link to="/signin" className="text-sm text-primary hover:underline">
							Back to login page
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default ResetPassword;
