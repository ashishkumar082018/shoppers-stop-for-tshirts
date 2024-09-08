import React, { useReducer } from "react";
import CartContext from "./CartContext";

// Retrieve cart data from localStorage
const getStoredCartData = () => {
    const storedData = localStorage.getItem('cartItems');
    if (storedData) {
        return JSON.parse(storedData);
    }
    return { Tshirts: [], totalAmount: 0 };
};

const defaultCartState = getStoredCartData();

const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        const updatedTotalAmount =
            state.totalAmount + action.Tshirt.price * action.Tshirt.amount;

        const existingTshirtIndex = state.Tshirts.findIndex(
            (Tshirt) => Tshirt.id === action.Tshirt.id
        );
        const existingCartTshirt = state.Tshirts[existingTshirtIndex];

        let updatedTshirts;
        if (existingCartTshirt) {
            const updatedTshirt = {
                ...existingCartTshirt,
                amount: existingCartTshirt.amount + action.Tshirt.amount,
            };
            updatedTshirts = [...state.Tshirts];
            updatedTshirts[existingTshirtIndex] = updatedTshirt;
        } else {
            updatedTshirts = state.Tshirts.concat(action.Tshirt);
        }

        // Save updated cart state to localStorage
        localStorage.setItem('cartItems', JSON.stringify({
            Tshirts: updatedTshirts,
            totalAmount: updatedTotalAmount,
        }));

        return {
            Tshirts: updatedTshirts,
            totalAmount: updatedTotalAmount,
        };
    }

    if (action.type === "REMOVE") {
        const existingTshirtIndex = state.Tshirts.findIndex(
            (Tshirt) => Tshirt.id === action.id
        );
        const existingTshirt = state.Tshirts[existingTshirtIndex];
        const updatedTotalAmount = state.totalAmount - existingTshirt.price;

        let updatedTshirts;
        if (existingTshirt.amount === 1) {
            updatedTshirts = state.Tshirts.filter(
                (Tshirt) => Tshirt.id !== action.id
            );
        } else {
            const updatedTshirt = {
                ...existingTshirt,
                amount: existingTshirt.amount - 1,
            };
            updatedTshirts = [...state.Tshirts];
            updatedTshirts[existingTshirtIndex] = updatedTshirt;
        }

        // Save updated cart state to localStorage
        localStorage.setItem('cartItems', JSON.stringify({
            Tshirts: updatedTshirts,
            totalAmount: updatedTotalAmount,
        }));

        return {
            Tshirts: updatedTshirts,
            totalAmount: updatedTotalAmount,
        };
    }

    return defaultCartState;
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
    );

    const addTshirtToCart = (Tshirt) => {
        dispatchCartAction({ type: "ADD", Tshirt: Tshirt });
    };

    const removeTshirtFromCart = (id) => {
        dispatchCartAction({ type: "REMOVE", id: id });
    };

    const cartContext = {
        Tshirts: cartState.Tshirts,
        totalAmount: cartState.totalAmount,
        addTshirt: addTshirtToCart,
        removeTshirt: removeTshirtFromCart,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
