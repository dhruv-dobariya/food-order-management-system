import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { food_list as default_food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState(default_food_list);

    // Backend URL (optional for standalone frontend mode)
    const url = import.meta.env.VITE_API_URL || "";

    // Add to cart
    const addTocart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));

        if (token && url) {
            try {
                await axios.post(
                    `${url}/api/cart/add`,
                    { itemId },
                    { headers: { token } }
                );
            } catch (error) {
                console.log("Cart Add Error:", error);
            }
        }
    };

    // Remove from cart
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const updated = { ...prev };
            if (updated[itemId] > 1) {
                updated[itemId] -= 1;
            } else {
                delete updated[itemId];
            }
            return updated;
        });

        if (token && url) {
            try {
                await axios.post(
                    `${url}/api/cart/remove`,
                    { itemId },
                    { headers: { token } }
                );
            } catch (error) {
                console.log("Cart Remove Error:", error);
            }
        }
    };

    // Cart total
    const getToatalCartAmount = () => {
        let totalAmount = 0;

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find(
                    (product) => String(product._id) === String(item)
                );

                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }

        return totalAmount;
    };

    // Fetch food list from backend if available
    const fetchFoodList = async () => {
        if (!url) return;
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success && response.data.data?.length > 0) {
                setFoodList(response.data.data);
            }
        } catch (error) {
            console.log("Using local static products (Backend offline or not configured)");
        }
    };

    // Load cart
    const loadCartData = async (token) => {
        if (!url) return;
        try {
            const response = await axios.post(
                `${url}/api/cart/get`,
                {},
                { headers: { token } }
            );

            if (response.data.success) {
                setCartItems(response.data.cartData || {});
            }
        } catch (error) {
            console.log("Cart fetch error:", error);
        }
    };

    useEffect(() => {
        async function loadData() {
            if (url) {
                await fetchFoodList();
            }

            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                setToken(savedToken);
                if (url) {
                    await loadCartData(savedToken);
                }
            }
        }

        loadData();
    }, [url]);

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
