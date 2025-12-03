"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormLabel, FormControl, FormMessage, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useCreateAccount from "@/lib/queries/users";
import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const LoginSchema = z.object({
    full_name: z.string(),
    user_name: z.string().max(10),
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
    password: z.string().min(6),
});

const SignUpForm = () => {

    const createAccount = useCreateAccount();
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            user_name: "",
            password: "",
            full_name: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        const resp = createAccount.mutate(values);
        router.push("/dashboard")
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="full_name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder=""  {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField control={form.control} name="user_name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>User Name</FormLabel>
                            <FormControl>
                                <Input placeholder=""  {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField control={form.control} name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="you@example.com"  {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField control={form.control} name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="*******"  {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full font-bold">
                    Create Account
                </Button>
            </form>
        </Form>
    )
}


export default SignUpForm;