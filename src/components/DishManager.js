import React, { useState, useEffect } from "react";
import "./DishManager.css";
import { Link } from 'react-router-dom';



const DishManager = (props) => {

    const setDishData = props.setDishData
    const dishes = props.dishes
    console.log("***----------**数据库***************")
    console.log(dishes)
    const categories = props.categories
    const getCategoryByCategoryId = props.getCategoryByCategoryId
    const handleNewDishSubmit = props.handleNewDishSubmit
    const handleDishDelete = props.handleDishDelete
    const onDishUpdate = props.onDishUpdate
    const imageUpload = props.imageUpload
    const loggedIn = props.loggedIn;
    const setLoggedIn = props.setLoggedIn;

    const [editedDishes, setEditedDishes] = useState([]);
    const [newDish, setNewDish] = useState({ name: '', categoryId: '', price: '', image: '', description: '', status: '' });

    const handleLogout = () => {
        localStorage.removeItem('loggedInUserID');
        setLoggedIn(!loggedIn); // Mark the user as logged out
    };


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


            // console.log("current update dishes")
            // console.log(updatedDishes)
            // console.log("current dishes")
            // console.log(dishes)
            return updatedDishes;
        });
    };

    const handleSubmit = (index) => {
        const updatedDish = editedDishes[index];
        onDishUpdate(updatedDish);
        window.alert('Change made successfully.');
    };

    const handleDelete = (index) => {
        const deleteDish = editedDishes[index];
        handleDishDelete(deleteDish.dishId);
    };

    // function sleep(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }

    const handleAddDish = async () => {
        // console.log("inside handleadddish")
        // console.log(newDish)
        // console.log(categories)
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
        // setDishData(prevDishes => [...prevDishes, dishTobeAdded]);
        setNewDish({ name: '', categoryId: '', price: '', image: '', description: '', status: '' });

        console.log("***----------**look here***************")
        console.log(categories)
    };

    return (
        <div>
            <h2>Welcome to Dish Management Center</h2>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>category_name</th>
                            <th>price</th>
                            <th>image</th>
                            <th>upload</th>
                            <th>description</th>
                            <th>status</th>
                            <th>options</th>
                        </tr>
                    </thead>
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
                                    <select name="categoryId"
                                        value={categories} onChange={(event) => handleInputChange(event, index)}>
                                        {console.log("******************look here")} 
                                        {console.log(categories)}
                                        {/* <option value="">{categories.find(category => category.categoryId === dish.categoryId)["name"]}</option> */}
                                        <option value={dish.categoryId}>{categories.find(category => category.categoryId === dish.categoryId)["name"]}</option>

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
                                    <select
                                        name="status"
                                        value={dish.status}
                                        onChange={(event) => handleInputChange(event, index)}
                                    >
                                        <option value="1">Inactive</option>
                                        <option value="0">Active</option>
                                    </select>
                                </td>

                                <td>
                                    <button onClick={() => handleSubmit(index)}>Submit</button>
                                    <button onClick={() => handleDelete(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                </table>
            </div>
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
                            setNewDish((prev) => ({ ...prev, image: event.target.files[0] }))
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
                <select
                    value={newDish.status}
                    onChange={(event) => setNewDish((prev) => ({ ...prev, status: event.target.value }))}
                >
                    <option value="0">Status: Active</option>
                    <option value="1">Status: Inactive</option>
                </select>
                <button onClick={handleAddDish}>Add New Dish</button>
            </div>
            <div>
                <Link to="/LogIn">
                    <button id="logout-button" onClick={handleLogout}>Logout</button>
                </Link>
            </div>
        </div>
    );
};

export default DishManager;



// import React, { useState, useEffect } from "react";
// import "./DishManager.css";
// import { Link } from 'react-router-dom';
// import DishItem from "./DishItem"; // Import the DishItem component
// import AddDishForm from "./AddDishForm"; // Import the AddDishForm component

// const DishManager = (props) => {
    
//     const setDishData = props.setDishData
//     const getAllDishData = props.getAllDishData
//     const dishes = props.dishes
//     const categories = props.categories
//     const getCategoryByCategoryId = props.getCategoryByCategoryId
//     const handleNewDishSubmit = props.handleNewDishSubmit
//     const handleDishDelete = props.handleDishDelete
//     const onDishUpdate = props.onDishUpdate
//     const imageUpload = props.imageUpload
//     const loggedIn = props.loggedIn;
//     const setLoggedIn = props.setLoggedIn;

//     const [editedDishes, setEditedDishes] = useState([]);
//     const [newDish, setNewDish] = useState({ name: '', categoryId: '', price: '', image: '', description: '', status: '' });

//     const handleLogout = () => {
//         localStorage.removeItem('loggedInUserID');
//         setLoggedIn(!loggedIn); // Mark the user as logged out
//     };


//     useEffect(() => {
//         setEditedDishes(dishes);
//     }, [dishes]);


//     const handleInputChange = (event, index) => {
//         const { name, value } = event.target;
//         setEditedDishes((prevDishes) => {
//             const updatedDishes = [...prevDishes];
//             console.log("inside handle input change")
//             console.log(name)
//             console.log(value)
//             if (name === "categoryId") {
//                 const dishCategoryId = categories.find(category => category.name === value)["categoryId"]
//                 updatedDishes[index][name] = dishCategoryId;
//             }
//             else if (name == "file") {
//                 updatedDishes[index].image = event.target.files[0];
//             }
//             else {
//                 updatedDishes[index][name] = value;
//             }

//             return updatedDishes;
//         });
//     };

//     const handleSubmit = (index) => {
//         const updatedDish = editedDishes[index];
//         onDishUpdate(updatedDish);
//         window.alert('Change made successfully.');
//     };

//     const handleDelete = (index) => {
//         const deleteDish = editedDishes[index];
//         handleDishDelete(deleteDish.dishId);
//     };

//     // function sleep(ms) {
//     //     return new Promise(resolve => setTimeout(resolve, ms));
//     // }

//     const handleAddDish = async () => {
//         const formData = new FormData();
//         formData.append('image', newDish.image);
//         const url = await imageUpload(formData)
//         console.log("handle dish returned url")
//         console.log(url)
//         const dishTobeAdded = {
//             name: newDish.name,
//             categoryId: newDish.categoryId,
//             price: newDish.price,
//             image: url,
//             description: newDish.description,
//             status: newDish.status
//         }
//         handleNewDishSubmit(dishTobeAdded);
//         setEditedDishes((prevDishes) => [...prevDishes, dishTobeAdded]);
//         setNewDish({ name: '', categoryId: '', price: '', image: '', description: '', status: '' });

//         console.log("here is handle add dish")
//         console.log(editedDishes)
//         console.log(categories)
//     };


//     return (
//         <div>
//             <h2>Welcome to Dish Management Center</h2>
//             <div>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>name</th>
//                             <th>category_name</th>
//                             <th>price</th>
//                             <th>image</th>
//                             <th>upload</th>
//                             <th>description</th>
//                             <th>status</th>
//                             <th>options</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {editedDishes && categories && editedDishes.map((dish, index) => (
//                             <DishItem
//                                 key={index}
//                                 dish={dish}
//                                 categories={categories}
//                                 handleInputChange={handleInputChange}
//                                 handleDelete={handleDelete}
//                                 handleSubmit={handleSubmit}
//                                 index={index}
//                             />
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             <AddDishForm
//                 newDish={newDish}
//                 setNewDish={setNewDish}
//                 categories={categories}
//                 handleAddDish={handleAddDish}
//             />
//             <div>
//                 <Link to="/LogIn">
//                     <button id="logout-button" onClick={handleLogout}>Logout</button>
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default DishManager;












