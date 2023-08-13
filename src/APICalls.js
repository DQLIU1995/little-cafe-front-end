import axios from "axios"; 

const dishBaseUrl = "http://localhost:8080/dishes"; 
const categoryBaseUrl = "http://localhost:8080/categories"; 
const userBaseUrl = "http://localhost:8080/user"; 



/***************************************--------Dish----------****************************************/ 


/*---------------------get api ------------------*/ 


// @returns allDishes 
export const getAllDish = async () => {
    const response = await axios
        .get(`${dishBaseUrl}`);
    const allDishes = response.data;
    return allDishes;
}; 

//@returns one dish
export const getDishByDishId = async (dish_id) => {
    const response = await axios 
        .get(`${dishBaseUrl}/${dish_id}`); 
    const selectedDish = response.data;
    return selectedDish; 
};

//@returns one dish by categoryID
export const getDishByCategoryId = async (category_id) => {
    const response = await axios 
        .get(`${dishBaseUrl}/category/${category_id}`); 
    const selectedDish = response.data;
    return selectedDish; 
};


//@returns filtered 
export const filterDishes = async (dish_id, name, category) => {
    const response = await axios.get(`${dishBaseUrl}/dishes/filter`, {
        params: {
            dish_id: dish_id,
            name: name,
            category: category  
        }
    }); 
    const selectedDishes = response.data;
    return selectedDishes; 
};


/*---------------------delete api ------------------*/ 

export const deleteDish = (dish_id) => {
    return axios 
    .delete(`${dishBaseUrl}/${dish_id}`)
};


export const deleteSelectDishes = async (dish_ids) => {
    try {
        const response = await axios.delete(`${dishBaseUrl}`, {
            params: {
                dish_id: dish_ids.join(',')
            }
        });
        return response.data;
    } catch (error) {
        // Handle error here if necessary
        throw error;
    }
};


/*---------------------put api ------------------*/ 

export const updateDish = (dish) => {
    return axios
    .put(`${dishBaseUrl}`, dish)
    .then(response => {
        const updatedDish = response.data;
        return updatedDish;
    })
    .catch(error => {
        // Handle errors if needed
        console.error('Error updating dish:', error);
        throw error;
    });
};



/*---------------------post api ------------------*/ 
export const addDish = (dish) => {
    return axios
    .post(`${dishBaseUrl}`, dish)
    .then(response => {
    const newDish = response.data;
    return newDish;
    });
};



/***************************************--------category----------****************************************/ 


/*---------------------get api ------------------*/ 

// @returns allCategory
export const getAllCategories = async () => {
    const response = await axios
        .get(`${categoryBaseUrl}`);
    const allCategories = response.data;
    return allCategories;
}; 

//@returns one category
export const getOneCategory = async (category_id) => {
    const response = await axios 
        .get(`${categoryBaseUrl}/${category_id}`); 
    const selectedCategories = response.data;
    return selectedCategories; 
}


/*---------------------delete api ------------------*/ 

export const deleteCategory = (category_id) => {
    return axios 
    .delete(`${categoryBaseUrl}/${category_id}`)
}


/*---------------------put api ------------------*/ 

export const updateCategory = (category) => {
    return axios
    .put(`${categoryBaseUrl}`, category)
    .then(response => {
        const updatedCategory = response.data;
        return updatedCategory;
    })
    .catch(error => {
        // Handle errors if needed
        console.error('Error updating category:', error);
        throw error;
    });
};


/*---------------------post api ------------------*/ 
export const addCategory = (category) => {
    return axios
    .post(`${categoryBaseUrl}`, category)
    .then(response => {
    const newCategory = response.data;
    return newCategory;
    });
};



/***************************************--------user----------****************************************/ 

/*---------------------get api ------------------*/ 

// @returns all Users
export const getAllUsers = async () => {
    const response = await axios
        .get(`${userBaseUrl}`);
    const allUsers = response.data;
    return allUsers;
}; 

//@returns one user
export const getOneUser = async (user_id) => {
    const response = await axios 
        .get(`${userBaseUrl}/${user_id}`); 
    const selectedUser = response.data;
    return selectedUser; 
}

/***************************************--------upload picture----------****************************************/ 

/*---------------------post api ------------------*/ 

export const uploadPicture = async (image) => {
    try {
        const response = await axios.post(`${dishBaseUrl}/image`, image);
        return response.data;
    } catch (error) {
        console.error('Error uploading picture:', error);
        throw error; // Re-throw the error to handle it in the calling code
    }
}