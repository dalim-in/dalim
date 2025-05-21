"use client";

import { Button } from "@dalim/core/ui/button";
import { Input } from "@dalim/core/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import Link from "next/link"; 
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { register } from "@dalim/auth";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@dalim/core/ui/form";
import { RegisterSchema } from "@dalim/auth";
import AuthCard from "./auth-card";
import AuthFormMessage from "./auth-form-message";


export default function RegisterForm() {
	 
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string>("");
	const [success, setSuccess] = useState<string>("");
	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
		startTransition(async () => {
			try {
				const { success, error } = await register(values);
				if (error) setError(error);
				setSuccess(success || "");
				form.reset();
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (error) {
				setSuccess("");
				setError("Error");
				form.reset();
			}
		});
	};

	return (
		<AuthCard title="Registre-se" description="Seja bem-vindo">
			<div className="space-y-4">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{"Name"}</FormLabel>
										<FormControl>
											<Input
												autoComplete="off"
												type="name"
												placeholder="Your Name"
												required
												{...field}
												disabled={isPending}
											/>
										</FormControl>
										<FormDescription className="hidden">{"Name"}</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{"E-mail"}</FormLabel>
										<FormControl>
											<Input type="email" placeholder="contact@dalim.in" required {...field} disabled={isPending} />
										</FormControl>
										<FormDescription className="hidden">{"Send Mail"}</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{"Password"}</FormLabel>
										<FormControl>
											<Input type="password" placeholder="******" required {...field} disabled={isPending} />
										</FormControl>
										<FormDescription className="hidden">{"Seu e-mail."}</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							{error && <AuthFormMessage type="default" message={error} title="Error" />}
							{success && <AuthFormMessage type="default" message={success} title="Sucess" />}
							<Button variant={"default"} className="w-full" disabled={isPending}>
								<LoaderIcon className={!isPending ? "hidden" : "animate-spin mr-2"} />
								<span>{"Register"}</span>
							</Button>
						</div>
					</form>
				</Form>

				<div className="mt-4 text-center text-sm">
					{"Já tem uma conta?"}{" "}
					<Link href="/auth/login" className="underline">
						{"Efetue Login"}
					</Link>
				</div>
			</div>
		</AuthCard>
	);
}