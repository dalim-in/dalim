"use client";

import { Button } from "@dalim/core/ui/button";
import { authClient } from "@/src/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { useToast } from "@dalim/core/hooks/use-toast";
interface ImpersonateUserProps {
	userId: string;
}

export default function ImpersonateUser({ userId }: ImpersonateUserProps) {
	const router = useRouter();
	const { toast } = useToast();

	const handleImpersonateUser = async () => {
		try {
			await authClient.admin.impersonateUser({
				userId: userId,
			});
			router.push("/");
			toast({
				title: "Impersonated user",
				description: "You are now impersonating this user",
			});
			router.refresh();
		} catch (error) {
			console.error("Failed to impersonate user:", error);
		}
	};

	return (
		<Button onClick={handleImpersonateUser} variant="outline" size="sm">
			Impersonate
		</Button>
	);
}
