"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/src/lib/auth/auth-client";
import LoadingButton from "@/src/components/ui/loading-button";
import { useState } from "react";

export default function SignoutButton() {
	const router = useRouter();
	const [pending, setPending] = useState(false);

	const handleSignOut = async () => {
		try {
			setPending(true);
			await authClient.signOut({
				fetchOptions: {
					onSuccess: () => {
						router.push("/login");
						router.refresh();
					},
				},
			});
		} catch (error) {
			console.error("Error signing out:", error);
		} finally {
			setPending(false);
		}
	};

	return (
		<LoadingButton pending={pending} onClick={handleSignOut}>
			Sign Out
		</LoadingButton>
	);
}
