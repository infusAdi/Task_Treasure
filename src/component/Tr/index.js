import React, { useEffect, useRef, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaSave } from "react-icons/fa";
import { motion } from 'framer-motion';
import { status_complete, status_ongoing, status_paused } from '../../redux/actions/todoAction';
import "./style.css";
import { toast } from 'react-toastify';

function Tr({ editId, item, editText, setEditText, handleEditUpdate, handleEdit, dispatch, remove_item, index }) {
    const [duration, setDuration] = useState(item.duration);
    const intervalId = useRef(null);

    useEffect(() => {
        if (item.status === 'Ongoing') {
            intervalId.current = setInterval(() => {
                setDuration(prev => prev + 1);
            }, 1000);
        } else if (item.status === 'Paused' || item.status === 'Completed') {
            clearInterval(intervalId.current);
            intervalId.current = null;
        }

        return () => clearInterval(intervalId.current);
    }, [item.status])

    function handleDelete(item) {

        if(item.status === "Ongoing")
        {
            toast.warning("Please Pause or End the task first");
        }
        else
        {
            dispatch(remove_item(item.id));
        }
    }
    return (
        <motion.tr initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}>
            <td>{index + 1}</td>
            {
                Number(editId) === Number(item.id) ? <td><input type='text' value={editText} onChange={(e) => setEditText(e.target.value)} className='edit-input' /></td> : <td>{item.title}</td>
            }

            {
                item.status === "Complete" ? <td style={{ color: "darkgreen", fontWeight: "600" }}>{new Date(duration * 1000).toISOString().substr(11, 8)}</td> : <td>{new Date(duration * 1000).toISOString().substr(11, 8)}</td>
            }

            <td style={{display:"flex"}}>
                <button className='action-btn' disabled={item.status === 'Ongoing' || item.status === "Paused" || item.status === "Complete"} onClick={() => dispatch(status_ongoing(item.id))}>Start</button>
                <button className='action-btn' onClick={() => dispatch(status_paused(item.id))} disabled={item.status === "Paused" || item.status === "Pending" || item.status === "Complete"}>Pause</button>
                <button className='action-btn' onClick={() => dispatch(status_complete(item.id))} disabled={item.status === "Complete"}>End</button>
                <button className='action-btn' disabled={item.status !== "Paused" || item.status === "Complete"} onClick={() => dispatch(status_ongoing(item.id))}>Resume</button>
            </td>

            {
                item.status === "Complete" ? <td style={{ color: "darkgreen", fontWeight: "600" }}>{item.status}</td> : <td>{item.status}</td>
            }


            {
                Number(editId) === Number(item.id) ? <td><FaSave style={{ transform: "scale(1.25)", cursor: "pointer" }} onClick={handleEditUpdate} /></td> : <td><FaEdit style={{ transform: "scale(1.25)", cursor: "pointer" }} onClick={() => handleEdit(item)} /></td>
            }



            <td><RiDeleteBinLine style={{ color: "red", transform: "scale(1.25)", cursor: "pointer" }} onClick={() => handleDelete(item)} /></td>
        </motion.tr>
    )
}

export default Tr