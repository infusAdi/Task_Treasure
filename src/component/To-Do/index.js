import React, { useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import {
  add_item,
  edit_item,
  remove_item,
} from "../../redux/actions/todoAction";
import Tr from "../Table";

import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Todo() {
  const [todo, setTodo] = useState("");

  const todoArr = useSelector((state) => state);
  const [ids, setIds] = useState(1);
  const [editId, setEditId] = useState("");
  const [editText, setEditText] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      navigate("/login");
      toast.warn("Please Login or Signup");
    }
  });

  function handleAdd(e) {
    e.preventDefault();
    if (todo) {
      dispatch(
        add_item({ id: ids, title: todo, status: "Pending", duration: 0 })
      );
      setTodo("");
      setIds(ids + 1);
    }
  }

  function handleEdit(item) {
    setEditId(item.id);
    setEditText(item.title);
  }

  function handleEditUpdate() {
    if (editId) {
      dispatch(edit_item({ id: editId, title: editText }));
      setEditText("");
      setEditId("");
    }
  }

  return (
    <div>
      <motion.div
        className="header"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="logo">
          <h2>Task Treasure</h2>
          <Link to={"/"}> 
            <button>Logout</button>
          </Link>
        </div>
      </motion.div>

      <div className="form">
        <form onSubmit={handleAdd}>
          <motion.input
            type="text"
            placeholder="What would you like to do?"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
          />
          <motion.button
            type="submit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25 }}
          >
            Add
          </motion.button>
        </form>
      </div>

      {todoArr.length > 0 ? (
        <motion.div
          className="main-container"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="items">
            <motion.h3
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.25 }}
            >
              {" "}
              Task List{" "}
            </motion.h3>
            <table>
              <thead>
                <motion.tr
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Duration</th>
                  <th>Actions</th>
                  <th>Status</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </motion.tr>
              </thead>
              <tbody>
                {todoArr.map((item, i) => (
                  <Tr
                    editId={editId}
                    item={item}
                    editText={editText}
                    setEditText={setEditText}
                    handleEditUpdate={handleEditUpdate}
                    handleEdit={handleEdit}
                    dispatch={dispatch}
                    remove_item={remove_item}
                    key={item.id}
                    index={i}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      ) : (
        <div className="main-container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            No Record Found
          </motion.h1>
        </div>
      )}
    </div>
  );
}

export default Todo;
