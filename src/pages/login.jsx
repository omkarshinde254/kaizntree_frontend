import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Alert from "../components/ui/alert";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/toast/use-toast";
import { useGlobalStore } from "../components/store/globalStore";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { toast } = useToast();
    const jwt = useGlobalStore((state) => state.jwt);
    const setJwt = useGlobalStore((state) => state.setJwt);
    const baseURL = useGlobalStore((state) => state.baseURL);

    const loginHandler = () => {
        if (email === "" || password === "") {
            toast({ title: "Please fill in all fields", variant: "destructive" });
            return;
        }
        toast({ title: "Logging in ..." });
        fetch(baseURL + "api/user/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: email, password: password }),
        })
            .then((res) => res.json())
            .then((data) => {
                localStorage.setItem("token", data.token);
                if (data.error) {
                    toast({ title: "Error: " + JSON.stringify(data.error), variant: "destructive" });
                } else {
                    toast({ title: "Logged in successfully!", variant: "success" });
                    setJwt(data.jwt);
                    navigate("/dashboard");
                }
            });
    };

    const createHandler = () => {
        if (email === "" || password === "") {
            toast({ title: "Please fill in all fields", variant: "destructive" });
            return;
        }
        toast({ title: "Creating account ..." });
        fetch(baseURL + "api/user/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: email, password: password }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    toast({ title: "Error: " + JSON.stringify(data.error), variant: "destructive" });
                } else {
                    toast({ title: "Account created successfully!", variant: "success" });
                }
            });
    };

    return (
        <div className="h-screen flex justify-center items-center">
            {alert.message && <Alert message={alert.message} type={alert.type} />}
            <div className="w-full max-w-xs">
                <h1 className="text-2xl mx-auto w-full text-center font-extrabold">Kaizntree</h1>
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <Input id="email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-6">
                        <Input id="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="flex items-center justify-between">
                        <Button variant="outline" onClick={createHandler}>
                            Create an account
                        </Button>
                        <Button onClick={loginHandler}>Login</Button>
                    </div>
                    <Button variant="link" className="text-blue-500 p-0 mt-4 font-normal">
                        Forgot Password?
                    </Button>
                </div>
            </div>
        </div>
    );
};

export { Login };
