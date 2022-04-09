import React, { useState } from 'react'
import './Form.css'

export default function Form({ setShowForm, baseUrl }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [ingredient, setIngredient] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const [autoCompleteIngredients, setAutoCompleteIngredients] = useState([]);
    const [message, setMessage] = useState('');
    const addRecipe = async (e) => {
        e.preventDefault();
        let ingredientsStringArr = ingredients.map(data => `${data.quantity} ${data.ingredient}`);
        let data = {
            "name": name,
            "description": description,
            "ingredients": ingredientsStringArr
        }

        let response = await fetch(`${baseUrl}/create`, {
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        data = await response.json();
        console.log(data);
        setIngredients([])
        setName('')
        setDescription('');
        setMessage(`${data.count} number of recipes available in database`);
        window.scrollTo(0, 0);
        setTimeout(() => {
            setShowForm(false);
            setMessage('');
        }, 3000);
    }

    const ingredientList = () => {
        let tableContents;
        tableContents = ingredients.map((data, index) => {
            return <tr key={index}>
                <td>{data.quantity}</td>
                <td>{data.ingredient}</td>
            </tr>
        });
        return tableContents;
    }

    const ingredientTable = () => {
        return <table>
            <thead>
                <tr>
                    <th>Quantity</th>
                    <th>Ingredient</th>
                </tr>
            </thead>
            <tbody>
                {ingredientList()}
            </tbody>
        </table>
    }

    const findIngredientFromDb = async (e) => {
        setIngredient(e.target.value);
        if (e.target.value !== '') {
            let response = await fetch(`${baseUrl}/ingredients`, {
                method: "POST",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ingredient: e.target.value
                })
            })
            let data = await response.json();
            setAutoCompleteIngredients(data.ingredient);
            console.log(data.ingredient);
        } else {
            setAutoCompleteIngredients([]);
        }
    }

    const addIngredient = (e) => {
        e.preventDefault();
        setIngredients([...ingredients, { "quantity": quantity, "ingredient": ingredient }]);
        setQuantity('');
        setIngredient('');
    }

    const selectIngredient = (e) => {
        let value = e.target.innerHTML;
        setIngredient(value)
        setAutoCompleteIngredients([])
    }

    const showAutoCompleteList = () => {
        return <ul className='auto-complete'>
            {autoCompleteIngredients.map((item, index) => autoCompleteItem(item, index))}
        </ul>
    }

    const autoCompleteItem = (item, index) => {
        return <li key={index} onClick={selectIngredient}>{item}</li>
    }

    const closeForm = () => {
        setQuantity('');
        setIngredient('');  
        setAutoCompleteIngredients([]);
        setIngredients([]);
        setName('');
        setDescription('');
        setShowForm(false)
    }

    return (
        <div className='form-container'>
            <p className="heading">Add Recipe</p>
            <span className='close' onClick={closeForm}>+</span>
            {message && <p className="message">{message}</p>}
            <form onSubmit={addRecipe}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} cols="30" rows="4" required></textarea>
                </div>
                <div className="form-group">
                    {ingredientTable()}
                </div>
                <button className='save-recipe-btn' type="submit">Save Recipe</button>
            </form>
            <form onSubmit={addIngredient}>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="ingredient">Ingredient</label>
                    <input type="text" value={ingredient} onChange={findIngredientFromDb} required />
                </div>
                {showAutoCompleteList()}
                <button className='add-recipe-btn' type='submit'>Add Ingredient</button>
            </form>
        </div>

    )
}
