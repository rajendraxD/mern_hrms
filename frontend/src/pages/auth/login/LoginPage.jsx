import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../../store/slices/userSlice";

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form);
        await dispatch(loginThunk(form)).then((res) => {
            console.log(res);
        });
    }
    return (
        <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" name="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input type="password" placeholder="Password" name="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
