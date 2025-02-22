import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [formdata, setFormdata] = useState({
        email: "",
        password: "",
    });
    const navigate=useNavigate()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value
        });
    };

    const isDisabled = !formdata.email || !formdata.password;
    

    const handleNavigation=(e:any)=>{
        e.preventDefault();
        if (formdata.email === "demouser" && formdata.password === "demopass") {
            localStorage.setItem("authenticated", "true");
            navigate("/lessonPage");
        } else {
            alert("Invalid Credentials!");
        }
    }
    return (
        <div className="flex justify-center flex-col min-h-screen">
            <div className="w-full max-w-xl mx-auto h-96 gap-10 border shadow-xl rounded-lg items-center flex flex-col justify-center">
                <h1 className="font-bold text-2xl">Please Login</h1>
                <div className="w-[70%] space-y-5">
                    <div>
                        <span className="text-lg font-bold">Email</span>
                        <Input
                            type="email"
                            name="email"
                            value={formdata.email}
                            onChange={handleChange}
                            required
                            className="border focus-ring focus:bg-gray-100"
                            placeholder="Email (demouser)"
                        />
                    </div>
                    <div>
                        <span className="text-lg font-bold">Password</span>
                        <Input
                            type="password"
                            name="password"
                            value={formdata.password}
                            onChange={handleChange}
                            required
                            className="border focus-ring focus:bg-gray-100"
                            placeholder="Password(demopass)"
                        />
                    </div>
                </div>
                <Button onClick={handleNavigation} disabled={isDisabled} className={`${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}>
                    Log In
                </Button>
            </div>
        </div>
    );
};

export default LoginPage;
