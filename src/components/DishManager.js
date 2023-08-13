import React, { useState, useEffect } from "react";
import "./DishManager.css";


const DishManager = (props) => {

    const setDishData = props.setDishData
    const getAllDishData = props.getAllDishData
    const dishes = props.dishes
    const categories = props.categories
    const getCategoryByCategoryId = props.getCategoryByCategoryId
    const handleNewDishSubmit = props.handleNewDishSubmit
    const handleDishDelete = props.handleDishDelete
    const onDishUpdate = props.onDishUpdate
    const imageUpload = props.imageUpload

    const [editedDishes, setEditedDishes] = useState([]);
    const [newDish, setNewDish] = useState({ name: '', categoryId: '', price: '', image: '', description: '', status: '' });

    useEffect(() => {
        setEditedDishes(dishes);
        console.log(dishes)
        console.log("this is dish manager category")
        console.log(categories)
    }, [dishes]);


    const handleInputChange = (event, index) => {
        const { name, value } = event.target;
        setEditedDishes((prevDishes) => {
            const updatedDishes = [...prevDishes];
            console.log("inside handle input change")
            console.log(name)
            console.log(value)
            if (name === "categoryId") {
                const dishCategoryId = categories.find(category => category.name === value)["categoryId"]
                updatedDishes[index][name] = dishCategoryId;
            }
            else if (name == "file") {
                updatedDishes[index].image = event.target.files[0];
            }
            else {
                updatedDishes[index][name] = value;
            }
            console.log("current update dishes")
            console.log(updatedDishes)
            console.log("current dishes")
            console.log(dishes)
            return updatedDishes;
        });
    };

    // const handleDocumentUpload = (event, index) => {
    //     const file = event.target.files[0]; 

    //     // Assuming you are using React state to manage the data
    //     const updatedDishes = [...dishes]; // Assuming 'dishes' is your array of dish objects
    //     updatedDishes[index].document = file; // Store the uploaded file in the dish object
    //     updatedDishes[index].documentName = file.name; // Store the file name

    //     setDishes(updatedDishes); // Update the state with the new information
    // };



    const handleSubmit = (index) => {
        const updatedDish = editedDishes[index];
        onDishUpdate(updatedDish);
    };

    const handleDelete = (index) => {
        const deleteDish = editedDishes[index];
        handleDishDelete(deleteDish.dishId);
    };

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleAddDish = async () => {
        console.log("inside handleadddish")
        console.log(newDish)
        console.log(categories)
        const formData = new FormData();
        formData.append('image', newDish.image);
        const url = await imageUpload(formData)
        console.log("handle dish returned url")
        console.log(url)
        const dishTobeAdded = {
            name: newDish.name,
            categoryId: newDish.categoryId,
            price: newDish.price,
            image: url,
            description: newDish.description,
            status: newDish.status
        }
        handleNewDishSubmit(dishTobeAdded);
        setEditedDishes((prevDishes) => [...prevDishes, dishTobeAdded])
        setNewDish({ name: '', categoryId: '', price: '', image: '', description: '', status: '' });
        console.log("here is handle add dish")
        console.log(editedDishes)
        console.log(categories)
    };

    return (
        <div>
            <h2>Welcome to Dish Management Center</h2>
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>category_name</th>
                        <th>price</th>
                        <th>image</th>
                        <th></th>
                        <th>description</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                    {console.log("inside dish management html block")}
                    {console.log(editedDishes)}
                    {console.log(categories)}
                    {console.log(newDish)}
                    {editedDishes && categories && editedDishes.map((dish, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="text"
                                    name="name"
                                    value={dish.name}
                                    onChange={(event) => handleInputChange(event, index)}
                                />
                            </td>
                            <td>
                                <select name="categoryId" value={categories} onChange={(event) => handleInputChange(event, index)}>
                                    <option value="">{categories.find(category => category.categoryId === dish.categoryId)["name"]}</option>
                                    {
                                        categories.filter(category => category.categoryId !== dish.categoryId).map((category) => (
                                            <option name="categoryId" value={category.name}>{category.name}</option>
                                        ))
                                    }
                                </select>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="price"
                                    value={dish.price}
                                    onChange={(event) => handleInputChange(event, index)}
                                />
                            </td>
                            <td>
                                {dish.image && (
                                    <img
                                        src={dish.image}
                                        alt="Uploaded"
                                        style={{ maxWidth: '100%', marginTop: '10px' }}
                                    />
                                )}
                            </td>
                            <td>
                                <form method="POST" encType="multipart/form-data">
                                    <input
                                        type="file"
                                        name="file"
                                        placeholder="image"
                                        onChange={(event) => handleInputChange(event, index)}
                                    />
                                </form>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="description"
                                    value={dish.description}
                                    onChange={(event) => handleInputChange(event, index)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="status"
                                    value={dish.status}
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
                <h4>Please Input New Dish Below</h4>
                <input
                    type="text"
                    placeholder="Name"
                    value={newDish.name}
                    onChange={(event) => setNewDish((prev) => ({ ...prev, name: event.target.value }))}
                />

                <select name="categoryId" value={newDish.categoryId}
                    onChange={(event) => setNewDish((prev) => ({ ...prev, categoryId: event.target.value }))}>
                    <option value="">Select an option</option>
                    {
                        categories.map((category) => (
                            <option name="categoryId" value={category.categoryId}>{category.name}</option>
                        ))
                    }
                </select>

                <input
                    type="number"
                    placeholder="Price"
                    value={newDish.price}
                    onChange={(event) => setNewDish((prev) => ({ ...prev, price: event.target.value }))}
                />
                <form method="POST" encType="multipart/form-data">
                    <input
                        type="file"
                        name="file"
                        placeholder="Image"
                        onChange={(event) => {
                            setNewDish((prev) => ({ ...prev, image: event.target.files[0]}))
                            console.log(newDish.image)
                        }}
                    />
                </form>
                <input
                    type="text"
                    placeholder="Description"
                    value={newDish.description}
                    onChange={(event) => setNewDish((prev) => ({ ...prev, description: event.target.value }))}
                />
                <input
                    type="text"
                    placeholder="Status"
                    value={newDish.status}
                    onChange={(event) => setNewDish((prev) => ({ ...prev, status: event.target.value }))}
                />
                <button onClick={handleAddDish}>Add New Dish</button>
            </div>
        </div>
    );
};

export default DishManager;