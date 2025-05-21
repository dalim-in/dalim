import { AlertCircle, CheckCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@dalim/core/ui/alert";

interface AuthFormMessageProps {
	title?: string;
	message: string;
	type: "default" | "destructive";
}
const AuthFormMessage = ({ message, type, title }: AuthFormMessageProps) => {
	return (
		<Alert variant={type}>
			{type === "default" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
			{title && <AlertTitle>{title}</AlertTitle>}
			<AlertDescription>{message}</AlertDescription>
		</Alert>
	);
};

export default AuthFormMessage;