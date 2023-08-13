import React, { useState, useEffect } from "react";
import './App.css';
import * as backend from "./APICalls.js";
import DishContainer from "./components/DishContainer";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogIn from "./components/LogIn";
import Navbar from "./components/NavBar";
import ManagerPage from "./components/ManagerManagement"; 
import DishManager from "./components/DishManager";
import CategoryManager from "./components/CategoryManager"; 



function App() {

  const [currentDishes, setCurrentDishData] = useState(null); 
  const [allDishes, setDishData] = useState(null); 
  const [currentCategories, setCategoryData] = useState([])
  const [categoryId, setCategoryId] = useState(null)
  const [allUser, setAllUser] = useState([])
  const [categories, setAllCategories] = useState([])
  const [loggedIn, setLoggedIn] = useState(false);

  function sort(array)
  {
    console.log(array)
    return array.sort(function(a, b)
    {
        var x = a.type;
        var y = b.type;
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
  



  /*-----------------------------------------   DISH ----------------------------------------------   */

  useEffect(() => {
    getAllDishData();
    console.log("in dish use effect")
    console.log(allDishes)
  }, []); 

  const handleNewDishSubmit = (data) => {
    backend
    .addDish(data)
    .then((result) => {
      setDishData((prevDishData) => [result, ...prevDishData]);
    })
    .catch((err) => {
      console.log("Error in handleNewDishSubmit", err);
    })
  };

  const handleDishDelete = (dishId) => {
    backend
    .deleteDish(dishId)
    .then(setDishData((prev) => prev.filter((dish) => dish.dishId !== dishId))
    )
    .catch((err) => {
      console.log("Error in handleDishDelete", err)
    })
  };

  const selectDishByCategoryId =(categoryId) => {
    backend
    .getDishByCategoryId(categoryId)
    .then((result) => {
      console.log("here in select dish by category id function");
      console.log(result);
      setCurrentDishData(result.data);
    })
  };
  
  const getDishByDishId =(dish_id) => {
    backend
    .getDishByDishId(dish_id)
    .then(setDishData((prev) => prev.filter((dish) => dish.dishId === dish_id)))
  };


  const onDishUpdate= async (dish) => {
    const dishToUpdate = dish;
    if (dishToUpdate.image instanceof File) {
      const formData = new FormData();
      formData.append('image', dishToUpdate.image);
      const url = await imageUpload(formData);
      console.log("inside on dishupdate get url")

      dishToUpdate.image = url;
      console.log(url)

    }
    console.log("inside on dishupdate")
    console.log(dishToUpdate)
    backend.updateDish(dishToUpdate)
    .then(() => {
      setDishData((prev) => sort(prev.map(eachDish => {
        if (eachDish.dishId === dishToUpdate.dishId) {
          return dishToUpdate;
        } else {
          return eachDish; 
        }
      })))
    })
    .catch((error) => {
      console.error('Error updating Dish:', error);
    });
  };


  const getAllDishData = () => {
    backend
    .getAllDish()
    .then((dishes) =>{
      setDishData(dishes.data);
    })
    .catch((err) => {
      console.log("Error in dishData()", err); 
    });
  }


  const imageUpload = async (image) => {
    return await backend.uploadPicture(image)
    .then(result => {
      console.log("returned url")
      console.log(result.data)
      return result.data
    })
    .catch((error) => {
      console.error('Error upload dish image:', error);
    });
  }
  /*-----------------------------------------   CATEGORY ----------------------------------------------   */

  useEffect(() => {
    backend
      .getAllCategories()
      .then((categories) => {
        setAllCategories(sort(categories.data));
      })
      .catch((err) => {
        console.log("Error in getAllCategories()", err);
      });
  }, []); 

  const getCategoryByCategoryId =(categoryId) => {
    backend
    .getOneCategory(categoryId)
    .then((result) => setCategoryData(result.data.name))
  };
  

  const onCategoryUpdate=(category) => {
    backend.updateCategory(category)
    .then(() => {
      setAllCategories((prev) => sort(prev.map(eachCategory => {
        if (eachCategory.categoryId === category.categoryId) {
          return category;
        } else {
          return eachCategory; 
        }
      })))
    })
    .catch((error) => {
      console.error('Error updating category:', error);
    });
  };

  const onCategoryDelete = (categoryId) => {
    backend
    .deleteCategory(categoryId)
    .then(setAllCategories((prev) => sort(prev.filter((category) => category.categoryId !== categoryId)))
    )
    .catch((err) => {
      console.log("Error in onCategoryDelete", err)
    })
  };

  const onCategoryAdd = (data) => {
    backend
    .addCategory(data)
    .then(() => {
      setAllCategories((prevCategory) => sort([...prevCategory, data]));
    })
    .catch((err) => {
      console.log("Error in onCategoryAdd", err);
    })
  };


  /*-----------------------------------------   userID  ----------------------------------------------   */
  useEffect(() => {
    backend
      .getAllUsers()
      .then((users) => {
        setAllUser(users.data);
      })
      .catch((err) => {
        console.log("Error in setAllUser()", err);
      });
  }, []); 

  const appetizerBar = () => {
    setCategoryId(101);
    getCategoryByCategoryId(101);
    selectDishByCategoryId(101);
  }

  const mainDishBar = () => {
  setCategoryId(102);
  getCategoryByCategoryId(102);
  selectDishByCategoryId(102);
  }

  const dessertBar = () => {
  setCategoryId(103);
  getCategoryByCategoryId(103);
  selectDishByCategoryId(103);
  }

  const handleCategoryClick =(categoryId) => {
    setCategoryId(categoryId);
    getCategoryByCategoryId(categoryId);
    selectDishByCategoryId(categoryId);
  }


  return (
    <Router>
      <div className="App">
        <Navbar  loggedIn={loggedIn} 
                  setLoggedI={setLoggedIn}/>
        <div className="content">
          <Routes>
            <Route exact path="/"
              element={
                <div >
                  <nav className="button-container">
                      {categories.map((category, index) => (
                        <button key={index} onClick={() => handleCategoryClick(category.categoryId)}>
                        {category.name}
                        </button>
                  ))}
                  </nav>
                  <div className='body__container'>
                    <h1 className="App-header"> 🍛 Little👨‍🍳 CAFE 🥘  </h1>
                    {
                      currentDishes ? 
                        <DishContainer
                          dishList={currentDishes}
                          categoryName={currentCategories}
                          categoryId={categoryId}
                        /> : 
                        <h2 className="App-header"> Welcome to My Cafe   </h2>
                    }
                  </div>
                </div> 
              }
            />
            <Route exact path="/LogIn"
            element={<LogIn allUsers={allUser} 
            loggedIn={loggedIn} 
            setLoggedIn={setLoggedIn}/>}
            />
            <Route exact path="/ManagerPage"
            element={<ManagerPage />}
            />
            <Route exact path="/DishManager"
            element={<DishManager 
                dishes={allDishes}
                categories={categories}
                setDishData={setDishData}
                getCategoryByCategoryId={getCategoryByCategoryId}
                getAllDishData={getAllDishData}
                handleNewDishSubmit={handleNewDishSubmit}
                handleDishDelete={handleDishDelete}
                onDishUpdate={onDishUpdate}
                imageUpload={imageUpload}
              />}
            />
            <Route exact path="/CategoryManager"
            element={<CategoryManager 
              categories={categories}
              onCategoryUpdate={onCategoryUpdate}
              onCategoryDelete={onCategoryDelete}
              onCategoryAdd={onCategoryAdd}
                    /> 
                      }
            />
          </Routes>
        </div>
      </div>
  </Router>
  );
}

export default App;
