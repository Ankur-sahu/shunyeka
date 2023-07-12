import React, { useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { storeUser } from '../../feature/userSlice';
import TableView from "../data_view/TableView"
import { getUsers } from "../../services/api";
import Button from "../common/Button";

const Dashboard = () => {
    const negivate = useNavigate()
    const dispatch = useDispatch();
    const users = useSelector((state) => state.allUser.users)
    const fetchUser = async()=>{
        const userList = await getUsers()
        dispatch(storeUser(userList))
    }

    useEffect(() => {
        fetchUser()
    }, [])
    return (
        <>
            <main className="dashboard-page">
                <Button onClick={()=>negivate('/form')} >Add User</Button>
                {users.length > 0 ? <TableView data={users} /> : <span>No Data Found</span>}
            </main>
        </>
    )
}

export default Dashboard