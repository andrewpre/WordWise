"use client";
import { Button } from "@/components/ui/button";
import { useSession, signIn } from "next-auth/react";
import { Card, CardHeader, CardFooter, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";


import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// useSession
export default function LoginPage(){
    const { data: session, status } = useSession();
    if(status === "authenticated"){
        redirect('/')
    }
    const [showPassword, setShowPassword] = useState(true)
    const formSchema = z.object({
        email: z.string().min(1, {
            message: "Email must be at least 1 characters"
        }),
        password: z.string().min(8, {
            message: "Password must be at least 8 characters"
        }).max(16, {
            message: "Password cannot be greater than 16 characters"
        }),
        repeat_password: z.string()
    }).refine((data) => data.password === data.repeat_password, {
        message: "Passwords do not match",
        path: ["repeat_password"],
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            repeat_password: "",
        },
    })
    
    
    async function submitSignIn(values: z.infer<typeof formSchema>){
        console.log("Sign In",values)
        // call API to sign in and return session id
        // if username/password is wrong returns an error
        
    }
    async function submitSignUp(values: z.infer<typeof formSchema>){
        console.log("Sign Up",values)
        try{
            const formData = new FormData()
            formData.append('email', values.email)
            formData.append('password', values.password)
            const response = await fetch("/api/user/connections", {
                method: 'POST',
                body: formData,
            },)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            console.log(`Submit SignUp Data`, data?.session)
            // add this to the cookies and change from logged out to login
            return data;
        }catch (error){
            console.log(`Sign Up Error: ${error}`)
        }
        // call api to sign up and return session id
            // create session
            // store session
                // see if email is there already
                // store email
                // store password (hashed)
            // 
        // if email used then returns an error and this returns error
    }

    return(
        <main className="border border-red-600 flex justify-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle className="text-center text-3xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl/none">Enter Your Information</CardTitle>
                </CardHeader>
                
                <CardContent>
                    <Tabs defaultValue="sign-in">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="sign-in">Sign In</TabsTrigger>
                            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
                        </TabsList>
                    
                        <TabsContent value="sign-in">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(submitSignIn)}>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({field}) => (
                                            <FormItem>
                                                {/* <FormLabel>Username</FormLabel> */}
                                                <FormControl>
                                                    <Input autoComplete="current-username" type="email" id="email" placeholder="Email*" {...field}/>
                                                </FormControl>
                                                <FormMessage className="text-red-500 pb-2"/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input autoComplete="current-password" id="password" type={showPassword ? "password" : "text"} placeholder="Password*" {...field}/>
                                                </FormControl>
                                                <FormMessage className="text-red-500 m-0 p-0"/>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                    className="w-full"
                                                    >
                                                    {showPassword ? "Show Password" : "Hide Password"}
                                                    {showPassword ? <EyeIcon/> : <EyeOffIcon/>}
                                                </Button>
                                                
                                            </FormItem>
                                        )}
                                    />
                                    
                                    
                                <div className="flex justify-center">
                                    <Button type="submit">Sign In</Button>
                                </div>
                                </form>
                            </Form>
                        </TabsContent>
                        
                        <TabsContent value="sign-up">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(submitSignUp)}>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({field}) => (
                                            <FormItem>
                                                {/* <FormLabel>Username</FormLabel> */}
                                                <FormControl>
                                                    <Input autoComplete="current-username" type="email" id="email" placeholder="Email*" {...field}/>
                                                </FormControl>
                                                <FormMessage className="text-red-500 pb-2"/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input autoComplete="current-password" id="password" type={showPassword ? "password" : "text"} placeholder="Password*" {...field}/>
                                                </FormControl>
                                                <FormMessage className="text-red-500 m-0 p-0"/>
                                                
                                                
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="repeat_password"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input autoComplete="current-password" id="repeat_password" type={showPassword ? "password" : "text"} placeholder="Repeat Password*" {...field}/>
                                                </FormControl>
                                                <FormMessage className="text-red-500 m-0 p-0"/>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                    className="w-full"
                                                    >
                                                    {showPassword ? "Show Password" : "Hide Password"}
                                                    {showPassword ? <EyeIcon/> : <EyeOffIcon/>}
                                                </Button>
                                            </FormItem>
                                        )}
                                    />
                                    
                                    
                                <div className="flex justify-center">
                                    <Button type="submit">Sign Up</Button>
                                </div>
                                </form>
                            </Form>
                        </TabsContent>
                    </Tabs>
                    <Separator orientation="horizontal" className="flex text-center justify-center my-4">Or...</Separator> 
                </CardContent>
                <CardFooter className="border border-red-600 flex flex-col">
                    <Button className="w-full" onClick={() => signIn('google')}>Continue with Google</Button>
                    <Button className="w-full" onClick={() => signIn('microsoft')}>Continue with Microsoft</Button>
                    <Button className="w-full" onClick={() => signIn('github')}>Continue with Github</Button>
                </CardFooter>
            </Card>
        </main>
    )
}