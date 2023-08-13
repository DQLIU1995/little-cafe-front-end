import React, { useState, useEffect } from "react";
import "./CategoryManager.css";
import { Link } from 'react-router-dom';

const CategoryTable = (props) => {
    const categories = props.categories
    /*console.log("category from prop")
    console.log(categories)*/
    const onCategoryUpdate = props.onCategoryUpdate
    const onCategoryDelete = props.onCategoryDelete
    const onCategoryAdd = props.onCategoryAdd
    const loggedIn = props.loggedIn; 
    const setLoggedIn = props.setLoggedIn;

    const [editedCategories, setEditedCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ type: '', name: '' });

    const handleLogout = () => {
        localStorage.removeItem('loggedInUserID');
        setLoggedIn(!loggedIn); // Mark the user as logged out
    };

    useEffect(() => {
        /*console.log("set up edit category")*/
        setEditedCategories(categories);
        /* console.log(editedCategories);
        console.log(categories);*/
    }, [categories]); 


    const handleInputChange = (event, index) => {
        const { name, value } = event.target;
        setEditedCategories((prevCategories) => {
            const updatedCategories = [...prevCategories];
            updatedCategories[index][name] = value;
            return updatedCategories;
        });
    };

    const handleSubmit = (index) => {
        const updatedCategory = editedCategories[index];
        onCategoryUpdate(updatedCategory);
    };

    const handleDelete = (index) => {
        const categoryToDelete = editedCategories[index];
        onCategoryDelete(categoryToDelete.categoryId);
    };

    const handleAddCategory = () => {
        onCategoryAdd(newCategory);
        setNewCategory({ type: '', name: '', status: '' });
    };

    return (
        <div>
            <h2> Welcome to Category Management Center</h2>
            <table>
                <thead>
                    <tr>
                        <th>Display Order</th>
                        <th>Name</th>
                        <th>Status(0:active)</th>
                        <th>Actions</th>
                    </tr>
                </thead >
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="text"
                                    name="type"
                                    value={category.type}
                                    onChange={(event) => handleInputChange(event, index)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="name"
                                    value={category.name}
                                    onChange={(event) => handleInputChange(event, index)}
                                />
                            </td>
                            <td>
                                <input 
                                    type="number"
                                    name="status"
                                    value={category.status}
                                    onChange={(event) => handleInputChange(event, index)}
                                    />
                            </td>
                            <td>
                                <button onClick={() => handleSubmit(index)}>Submit</button>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <h4>Please Input New Category Below</h4>
                <input
                    type="text"
                    placeholder="Display Order"
                    value={newCategory.type}
                    onChange={(event) => setNewCategory((prev) => ({ ...prev, type: event.target.value }))}
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={newCategory.name}
                    onChange={(event) => setNewCategory((prev) => ({ ...prev, name: event.target.value }))}
                />
                <input
                    type="text"
                    placeholder="Status"
                    value={newCategory.status}
                    onChange={(event) => setNewCategory((prev) => ({ ...prev, status: event.target.value }))}
                />
                <button onClick={handleAddCategory}>Add New Category</button>
            </div>
            <div>
                <Link to="/LogIn">
                <button id="logout-button" onClick={handleLogout}>Logout</button> 
                </Link>
            </div>
        </div>
    );
};

export default CategoryTable;
