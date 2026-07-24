import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    // Backend URL
    const url = import.meta.env.VITE_API_URL;

    // Add to cart
    const addTocart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({
                ...prev,
                [itemId]: prev[itemId] + 1,
            }));
        }

        if (token) {
            try {
                await axios.post(
                    `${url}/api/cart/add`,
                    { itemId },
                    { headers: { token } }
                );
            } catch (error) {
                console.log(error);
            }
        }
    };

    // Remove from cart
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] - 1,
        }));

        if (token) {
            try {
                await axios.post(
                    `${url}/api/cart/remove`,
                    { itemId },
                    { headers: { token } }
                );
            } catch (error) {
                console.log(error);
            }
        }
    };

    // Cart total
    const getToatalCartAmount = () => {
        let totalAmount = 0;

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find(
                    (product) => product._id === item
                );

                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }

        return totalAmount;
    };

    // Fetch food list
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);

            if (response.data.success) {
                setFoodList(response.data.data);
            }
        } catch (error) {
            console.log("Food List Error:", error);
        }
    };

    // Load cart
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(
                `${url}/api/cart/get`,
                {},
                { headers: { token } }
            );

            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();

            const savedToken = localStorage.getItem("token");

            if (savedToken) {
                setToken(savedToken);
                await loadCartData(savedToken);
            }
        }

        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addTocart,
        removeFromCart,
        getToatalCartAmount,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;




// import { createContext, useEffect, useState } from "react";
// // import { food_list } from "../assets/assets"  remove ; 

// import axios from 'axios'
// export const StoreContext = createContext(null)


// const StoreContextProvider = (props) => {

//     const [cartItems, setCartItems] = useState({});
//     const url = "http://localhost:4000"
//     const [token, setToken] = useState("");
//     const [food_list, setFoodList] = useState([])

//     // add  tocart 
//     const addTocart = async (itemId) => {
//         if (!cartItems[itemId]) {
//             setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
//         }
//         else {
//             setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
//         }
//         if (token) {
//             await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
//         }
//     }

//     // remove to cart
//     const removeFromCart = async (itemId) => {
//         setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
//         if (token) {
//             await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
//         }
//     }


//     // const getToatalCartAmount = () => {
//     //     let totalAmount = 0;
//     //     for (const item in cartItems) {
//     //         if (cartItems[item] > 0) {

//     //             let itemInfo = food_list.find((product) => product._id === item)
//     //             totalAmount += itemInfo.price * cartItems[item];
//     //         }
//     //     }
//     //     return totalAmount;
//     // }


//     const getToatalCartAmount = () => {
//         let totalAmount = 0;

//         for (const item in cartItems) {
//             if (cartItems[item] > 0) {

//                 let itemInfo = food_list.find(
//                     (product) => product._id === item
//                 );

//                 if (itemInfo) {
//                     totalAmount += itemInfo.price * cartItems[item];
//                 }
//             }
//         }

//         return totalAmount;
//     }

//     // fetch food list display

//     const fetchFoodList = async () => {
//         const response = await axios.get(url + "/api/food/list");
//         setFoodList(response.data.data)
//     }


//     const loadCartData = async (token) => {
//         try {
//             const response = await axios.post(
//                 url + "/api/cart/get",
//                 {},
//                 { headers: { token } }
//             );

//             if (response.data.success) {
//                 setCartItems(response.data.cartData);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     useEffect(() => {

//         async function loadData() {
//             await fetchFoodList();
//             if (localStorage.getItem("token")) {
//                 setToken(localStorage.getItem("token"))
//                 await loadCartData(localStorage.getItem("token"));
//             }
//         }
//         loadData();
//     }, [])


//     const contextValue = {
//         food_list,
//         cartItems,
//         setCartItems,
//         addTocart,
//         removeFromCart,
//         getToatalCartAmount,
//         url,
//         token,
//         setToken


//     }

//     return (
//         <StoreContext.Provider value={contextValue}>
//             {props.children}
//         </StoreContext.Provider>
//     )
// }

// export default StoreContextProvider
