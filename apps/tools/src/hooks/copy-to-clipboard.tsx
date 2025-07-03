import { cn } from "@dalim/core/lib/utils";
import { CheckCheck, Copy } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@dalim/core/ui/button";

type CopyProps = {
	children?: React.ReactNode;
	text: string;
	classname?: string;
};

const CopyToClipboard: React.FC<CopyProps> = ({
	children,
	text,
	classname,
}) => {
	const [copied, setCopied] = useState(false);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
		toast.success("code copied", {
			description: "The code has been copied to your clipboard",
		});
	};

	return (
		<Button
			onClick={copyToClipboard}
			size="icon"
			variant="outline"
			className={cn(
				"absolute top-1.5 right-1.5 z-10 grid h-8 w-8 place-content-center border-0",
				classname,
			)}
		>
			{copied ? <CheckCheck /> : <Copy />} {children}
		</Button>
	);
};

export default CopyToClipboard;
