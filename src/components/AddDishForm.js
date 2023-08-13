// import React from "react";

// const AddDishForm = (props) => {
//     const newDish = props.newDish
//     const setNewDish = props.setNewDish
//     const categories = props.categories
//     const handleAddDish = props.handleAddDish
//     return (
//         <div>
//             <h4>Please Input New Dish Below</h4>
//             <input
//                     type="text"
//                     placeholder="Name"
//                     value={newDish.name}
//                     onChange={(event) => setNewDish((prev) => ({ ...prev, name: event.target.value }))}
//                 />

//                 <select name="categoryId" value={newDish.categoryId}
//                     onChange={(event) => setNewDish((prev) => ({ ...prev, categoryId: event.target.value }))}>
//                     <option value="">Select an option</option>
//                     {
//                         categories.map((category) => (
//                             <option name="categoryId" value={category.categoryId}>{category.name}</option>
//                         ))
//                     }
//                 </select>

//                 <input
//                     type="number"
//                     placeholder="Price"
//                     value={newDish.price}
//                     onChange={(event) => setNewDish((prev) => ({ ...prev, price: event.target.value }))}
//                 />
//                 <form method="POST" encType="multipart/form-data">
//                     <input
//                         type="file"
//                         name="file"
//                         placeholder="Image"
//                         onChange={(event) => {
//                             setNewDish((prev) => ({ ...prev, image: event.target.files[0] }))
//                             console.log(newDish.image)
//                         }}
//                     />
//                 </form>
//                 <input
//                     type="text"
//                     placeholder="Description"
//                     value={newDish.description}
//                     onChange={(event) => setNewDish((prev) => ({ ...prev, description: event.target.value }))}
//                 />
//                 <select
//                     value={newDish.status}
//                     onChange={(event) => setNewDish((prev) => ({ ...prev, status: event.target.value }))}
//                 >
//                     <option value="0">Status: Active</option>
//                     <option value="1">Status: Inactive</option>
//                 </select>
//                 <button onClick={handleAddDish}>Add New Dish</button>
//         </div>
//     );
// };

// export default AddDishForm;
