'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react"
import axios from "axios"

export default function Home() {
    const [signinData, setSigninData] = useState({
        mail:'',
        password:''
    })
    const [signupData, setSignupData] = useState({
        name:'',
        mail:'',
        password:''
    })

    const handleSignin = async () => {
      try {
        const res = await axios.post("http://localhost:8080/api/auth/login", { signinData.mail, signinData.password });
    
        if (res.data.token) {
          localStorage.setItem("token", res.data.token); // ⚠️ Not fully secure (use HTTP-only cookies if possible)
        }
    
        return res.data;
      } catch (error) {
        console.error("Login failed", error);
      }
    }
    const handleSignup = () => {
        console.log(signupData)
    }
  return (
    <div className="flex items-center justify-center h-full w-full">
    <Tabs defaultValue="signin" className="w-[450px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin">Signin</TabsTrigger>
        <TabsTrigger value="signup">Signup</TabsTrigger>
      </TabsList>
      <TabsContent value="signin"  >
        <Card >
          <CardHeader className="flex items-center">
            <CardTitle className="text-xl">Sign in</CardTitle>
            <CardDescription>
                Don&apos;t have an account? Sign up
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input 
              id="email" 
              type="email" 
              onChange={(e)=>{setSigninData({...signinData,mail:e.target.value})}}
              placeholder="example@gamil.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input 
              id="password" 
              type="password" 
              onChange={(e)=>{setSigninData({...signinData,password:e.target.value})}}
              placeholder="***********" />
            </div>
            <div className="flex justify-center ">
              <Button className="mt-4 mb-1">Guest Signin</Button>
            </div>
          </CardContent>
          <CardFooter >
            <Button onClick={handleSignin} className="w-full">Sign In</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card>
          <CardHeader className="flex items-center">
            <CardTitle className="text-xl">Sign up</CardTitle>
            <CardDescription>
                Already have an account? Sign In
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <div className="space-y-1">
              <Label htmlFor="username">Name</Label>
              <Input 
              id="username" 
              type="text" 
              onChange={(e)=>{setSignupData({...signupData,name:e.target.value})}}
              placeholder="name"/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input 
              id="email" 
              type="email" 
              onChange={(e)=>{setSignupData({...signupData,mail:e.target.value})}}
              placeholder="example@gamil.com"/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="current">Password</Label>
              <Input 
              id="current" 
              type="password" 
              onChange={(e)=>{setSignupData({...signupData,password:e.target.value})}}
              placeholder="**********"/>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSignup} className="w-full">Sign Up</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
  )
}
