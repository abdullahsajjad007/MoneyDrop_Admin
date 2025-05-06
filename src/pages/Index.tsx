import {useState} from "react";
import {useToast} from "@/hooks/use-toast";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Card, CardContent} from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import {useSendNotifications} from "@/hooks";
import {useIsMutating} from "@tanstack/react-query";

interface Forms {
	message: string;
}

const Index = () => {
	const [message, setMessage] = useState("");
	const {toast} = useToast();

	const {mutate, isSuccess, reset} = useSendNotifications();
	const isLoading = useIsMutating();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const FormData = {message};

		mutate(FormData as Forms, {
			onSuccess: () => {
				setMessage("");
			},
		});
	};

	const handleCancel = () => {
		setMessage("");
	};

	return (
		<Navbar>
			<div className="container mx-auto max-w-7xl py-8">
				<h1 className="text-2xl font-semibold mb-6">Notifications</h1>

				<Card>
					<CardContent className="pt-6">
						<div className="space-y-6">
							<h2 className="text-xl text-center">
								Send Notifications to users
							</h2>

							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="space-y-2">
									<label htmlFor="message" className="text-sm font-medium">
										Message
									</label>
									<Textarea
										id="message"
										placeholder="Enter Notification message"
										value={message}
										onChange={e => setMessage(e.target.value)}
										className="min-h-[100px]"
									/>
								</div>

								<div className="flex justify-start gap-4">
									<Button
										type="button"
										variant="outline"
										onClick={handleCancel}
									>
										Cancel
									</Button>
									<Button type="submit" loading={isLoading > 0}>
										Send
									</Button>

									{/* <Button
										type="submit"
										className="w-full bg-primary hover:bg-primary-hover"
										// disabled={isLoading > 0}
									>
										Login to your account
									</Button> */}
								</div>
							</form>
						</div>
					</CardContent>
				</Card>
			</div>
		</Navbar>
	);
};

export default Index;
