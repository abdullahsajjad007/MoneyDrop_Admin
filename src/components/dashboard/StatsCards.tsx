import {Card, CardContent} from "@/components/ui/card";
import {useDashboardAnalytics} from "@/hooks";
import {useNavigate} from "react-router-dom";

const StatsCards = () => {
	const {data: DashboardAnalytics} = useDashboardAnalytics();
	const navigate = useNavigate();

	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
			<Card
				className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
				onClick={() => navigate("/sticker-submission")}
			>
				<CardContent className="p-6">
					<h2 className="text-sm font-medium text-muted-foreground">
						Sticker Locations
					</h2>
					<p className="text-3xl font-bold mt-2">
						{DashboardAnalytics?.total_sticker_locations || 0}
					</p>
				</CardContent>
			</Card>

			<Card
				className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
				onClick={() => navigate("/sticker-submission")}
			>
				<CardContent className="p-6">
					<h2 className="text-sm font-medium text-muted-foreground">
						Total Stickers Found
					</h2>
					<p className="text-3xl font-bold mt-2">
						{DashboardAnalytics?.total_stickers_found || 0}
					</p>
				</CardContent>
			</Card>

			<Card
				className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
				onClick={() => navigate("/users")}
			>
				<CardContent className="p-6">
					<h2 className="text-sm font-medium text-muted-foreground">
						Total Users
					</h2>
					<p className="text-3xl font-bold mt-2">
						{DashboardAnalytics?.total_users || 0}
					</p>
				</CardContent>
			</Card>

			<Card
				className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
				onClick={() => navigate("/payments")}
			>
				<CardContent className="p-6">
					<h2 className="text-sm font-medium text-muted-foreground">
						Total Payment Amount
					</h2>

					<p className="text-3xl font-bold mt-2">
						{DashboardAnalytics?.total_payments_amount || 0}
					</p>
				</CardContent>
			</Card>
		</div>
	);
};

export default StatsCards;
