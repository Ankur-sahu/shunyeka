import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUser } from "../../services/api";

const Profile = () => {
    const { id } = useParams()
    const [userInfo, setUserInfo] = useState({})

    const getUserById = async () => {
        const resp = await getUser(id)
        console.log(resp)
        setUserInfo(resp)
    }

    useEffect(() => {
        getUserById()
    }, [])
    return (
        <main className="dashboard-page">
            <h1>User Profile</h1>
            <div className="profile">
                <div><h2>User Id :</h2> <h4>{userInfo._id}</h4></div>
                <div><h2>Name :</h2> <h4>{userInfo.name}</h4></div>
                <div><h2>Email :</h2> <h4>{userInfo.email}</h4></div>
                <div><h2>Phone :</h2> <h4>{userInfo.phone}</h4></div>
                <Link to={'/'}>Go Back To Home</Link>
            </div>
        </main>
    )
}
export default Profile