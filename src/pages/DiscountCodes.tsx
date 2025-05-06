import React from "react";
import {Button} from "@/components/ui/button";
import {DataTable} from "@/components/shared/DataTable";
import {columns} from "@/components/discount-codes/columns";
import {PlusCircle} from "lucide-react";
import {AddDiscountCodeDialog} from "@/components/discount-codes/AddDiscountCodeDialog";
import {useDisclosure} from "@/hooks/use-disclosure";
import Navbar from "@/components/layout/Navbar";
import {useGetAllDiscountCodes} from "@/hooks";

const DiscountCodes = () => {
	const {isOpen, onOpen, onClose} = useDisclosure();
	const {data} = useGetAllDiscountCodes();

	return (
		<Navbar>
			<div className="container mx-auto py-10">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-semibold">Discount Codes</h1>
					<Button
						onClick={onOpen}
						className="bg-primary hover:bg-primary-hover"
					>
						<PlusCircle className="mr-2 h-4 w-4" />
						Add Discount
					</Button>
				</div>
				{data && <DataTable columns={columns} data={data} />}

				<AddDiscountCodeDialog open={isOpen} onClose={onClose} />
			</div>
		</Navbar>
	);
};

export default DiscountCodes;
