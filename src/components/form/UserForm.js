import React, { useEffect, useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { validationInput } from "../../utils/validation/validateInput";
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { createUser, getUser, updateUser } from "../../services/api";

const UserForm = () => {
    const negivate = useNavigate()
    const userId = useLocation().state?.id
    const initValue = {
        name: "",
        email: "",
        phone: "",
    }
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState(initValue)
    const [validateFrom, setValidateForm] = useState(initValue)

    const handleInput = (e) => {
        const { name, value } = e.target
        setUserInfo({ ...userInfo, [name]: value })
        setValidateForm({ ...validateFrom, [name]: "" })
    }

    const registerUser = async (e) => {
        e.preventDefault()
        const formData = { ...userInfo }
        const errorMsg = { ...validateFrom }
        validationInput(formData, errorMsg)
        const { email, name, phone } = errorMsg
        if (email || name || phone) {
            setValidateForm(errorMsg)
            return
        }

        const resp = await userId ? updateUser(userId, userInfo) : createUser(userInfo)
        if (await resp) {
            toast.success("Successfully Submited")
            navigate('/')
        }
    }

    const getUserById = async () => {
        const userProfile = await getUser(userId)
        setUserInfo(userProfile)
    }
    useEffect(() => {
        if (userId) {
            getUserById()
        }
    }, [])
    return (
        <main className="display-row">
            <div className="display-col container">
                <h1>{userId ? "Update User" : "Create User"}</h1>
                <form onSubmit={registerUser} style={{ width: "80%" }}>
                    <Input
                        type="text"
                        label="Full Name"
                        value={userInfo.name}
                        onChange={(e) => handleInput(e)}
                        name="name"
                        errMsg={validateFrom.name}
                    />

                    <Input
                        type="email"
                        label="Email"
                        value={userInfo.email}
                        onChange={(e) => handleInput(e)}
                        name="email"
                        errMsg={validateFrom.email}
                    />
                    <Input
                        type="number"
                        label="Phone"
                        value={userInfo.phone}
                        onChange={(e) => handleInput(e)}
                        name="phone"
                        errMsg={validateFrom.phone}
                    />
                    <div>
                        <Button onClick={() => negivate(`/`)} >Cancel</Button>
                        <Button type="submit">{userId ? "Update" : "Create"}</Button>
                    </div>

                </form>
            </div>
        </main>
    )
}

export default UserForm