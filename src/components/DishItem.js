// import React from "react";

// const DishItem = (props) => {
//     const dish = props.dish;
//     const categories = props.categories
//     const handleInputChange = props.handleInputChange
//     const handleDelete = props.handleDelete
//     const handleSubmit = props.handleSubmit
//     const index = props.index
//     return (
//         <div>
//             <tr key={index}>
//                 <td>
//                     <input
//                         type="text"
//                         name="name"
//                         value={dish.name}
//                         onChange={(event) => handleInputChange(event, index)}
//                     />
//                 </td>
//                 <td>
//                     <select name="categoryId"
//                         value={categories} onChange={(event) => handleInputChange(event, index)}>
//                         <option value="">{categories.find(category => category.categoryId === dish.categoryId)["name"]}</option>
//                         {
//                             categories.filter(category => category.categoryId !== dish.categoryId).map((category) => (
//                                 <option name="categoryId" value={category.name}>{category.name}</option>
//                             ))
//                         }
//                     </select>
//                 </td>
//                 <td>
//                     <input
//                         type="number"
//                         name="price"
//                         value={dish.price}
//                         onChange={(event) => handleInputChange(event, index)}
//                     />
//                 </td>
//                 <td>
//                     {dish.image && (
//                         <img
//                             src={dish.image}
//                             alt="Uploaded"
//                             style={{ maxWidth: '100%', marginTop: '10px' }}
//                         />
//                     )}
//                 </td>
//                 <td>
//                     <form method="POST" encType="multipart/form-data">
//                         <input
//                             type="file"
//                             name="file"
//                             placeholder="image"
//                             onChange={(event) => handleInputChange(event, index)}
//                         />
//                     </form>
//                 </td>
//                 <td>
//                     <input
//                         type="text"
//                         name="description"
//                         value={dish.description}
//                         onChange={(event) => handleInputChange(event, index)}
//                     />
//                 </td>
//                 <td>
//                     <select
//                         name="status"
//                         value={dish.status}
//                         onChange={(event) => handleInputChange(event, index)}
//                     >
//                         <option value="1">Inactive</option>
//                         <option value="0">Active</option>
//                     </select>
//                 </td>

//                 <td>
//                     <button onClick={() => handleSubmit(index)}>Submit</button>
//                     <button onClick={() => handleDelete(index)}>Delete</button>
//                 </td>
//             </tr>
//         </div>
//     );
// };

// export default DishItem;
