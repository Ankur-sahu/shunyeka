import React from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Button from "../common/Button";
import { deleteUser } from "../../services/api";
import { deleteUserFromList } from "../../feature/userSlice";

const TableView = ({ data,  }) => {
    const negivate = useNavigate()
    const dispatch = useDispatch();

    const deleteUserById = async (index,userId) => {
        const resp = await deleteUser(userId)
        if(resp){
            toast.success("User deleted successfully!")
            dispatch(deleteUserFromList(index))
        }
    }
    return (
        <>
            {data.length > 0 && <table>
                <thead>
                    <tr>
                        <th>S. No</th>
                        <th>User Id</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>

                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index+1}</td>
                            <td>{item._id}</td>
                            <td>{item.name}</td>

                            <td>
                                <Button onClick={()=>negivate(`/profile/${item._id}`)} >View</Button>
                                <Button onClick={()=>negivate('/form',{ state: { id:item._id } })} >Edit</Button>
                                <Button onClick={() => deleteUserById(index, item._id)}>Delete</Button>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
            }

        </>
    )
}

export default TableView