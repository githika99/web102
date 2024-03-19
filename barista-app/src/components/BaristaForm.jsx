import React, {Component, useState} from "react";
import RecipeChoices from "./RecipeChoices";
import drinksJson from "./drinks.json"
const BaristaForm = () => {

    const [currentDrink, setcurrentDrink] = useState('');

    const [truetemp, settruetemp] = useState('');

    const [truemilk, settruemilk] = useState('');

    const [truesyrup, settruesyrup] = useState('');

    const [trueblended, settrueblended] = useState('');

    const[trueRecipe, settrueRecipe] = useState({});

    const [inputs, setInputs] = useState({
        'temperature': '',
        'milk': '',
        'syrup': '',
        'blended': ''
    });

    const ingredients = {
        'temperature' : ['hot', 'lukewarm', 'cold'],
        'syrup': ['mocha', 'vanilla', 'toffee', 'maple', 'caramel', 'other', 'none'],
        'milk': ['cow', 'oat', 'goat', 'almond', 'none'],
        'blended': ['yes', 'turbo', 'no']
      }

    const onCheckAnswer = () => {
        if (trueRecipe.temp != inputs['temperature']){
            settruetemp('wrong');
        }
        else {
            settruetemp("correct");
        }

        if (trueRecipe.milk != inputs['milk']){
            settruemilk('wrong');
        }
        else {
            settruemilk("correct");
        }

        if (trueRecipe.syrup != inputs['syrup']){
            settruesyrup('wrong');
        }
        else {
            settruesyrup("correct");
        }

        if (trueRecipe.blended != inputs['blended']){
            settrueblended('wrong');
        }
        else {
            settrueblended("correct");
        }
        
    };

    const onNewDrink = () => {
        setInputs({
            'temperature': '',
            'milk': '',
            'syrup': '',
            'blended': ''
        });

        //reset users choices to blank strings
        settruetemp('');
        settruemilk('');
        settruesyrup('');
        settrueblended('');

        getNextDrink();
        
    };

    const getNextDrink = () => {
        let randomDrinkIndex = Math.floor(Math.random() * drinksJson.drinks.length);
        setcurrentDrink(drinksJson.drinks[randomDrinkIndex]['name']);
        settrueRecipe(drinksJson.drinks[randomDrinkIndex]['ingredients']);

        
    };
  
  return (
    <div>

        <h2>Hi, I'd like to order a:</h2>

        <div className='drink-container'>
            <h2 className="mini-header">{currentDrink}</h2>
            <button className="button newdrink" type="new-drink-button" onClick={onNewDrink}>🔄</button>
        </div>

        <form className="container">
        <div className="mini-container">
            <h3>Temperature</h3>
                <div className="answer-space" id={truetemp}>
                {inputs["temperature"]} 
                </div>
                <RecipeChoices
                handleChange={(e) => setInputs((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                }))}
                label="temperature"
                choices={ingredients["temperature"]}
                checked={inputs["temperature"]}
            />
        </div>

        <div className="mini-container">
            <h3>Milk</h3>
                <div className="answer-space" id={truemilk}>
                {inputs["milk"]} 
                </div>
                <RecipeChoices
                handleChange={(e) => setInputs((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                }))}
                label="milk"
                choices={ingredients["milk"]}
                checked={inputs["milk"]}
            />
        </div>

        <div className="mini-container">
            <h3>Blended</h3>
                <div className="answer-space" id={trueblended}>
                {inputs["blended"]} 
                </div>
                <RecipeChoices
                handleChange={(e) => setInputs((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                }))}
                label="blended"
                choices={ingredients["blended"]}
                checked={inputs["blended"]}
            />
        </div>

        <div className="mini-container">     
            <h3>Syrup</h3>
                <div className="answer-space" id={truesyrup}>
                {inputs["syrup"]} 
                </div>
                <RecipeChoices
                handleChange={(e) => setInputs((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                }))}
                label="syrup"
                choices={ingredients["syrup"]}
                checked={inputs["syrup"]}
            />
        </div>   

        </form>

        <button type="submit" className="button submit" onClick={onCheckAnswer}>
        Check Answer
        </button>

        {/* <button
            type="new-drink-button" className="button newdrinkbottom" onClick={onNewDrink}>
        New Drink
        </button> */}

    </div>
  );
  
};

export default BaristaForm;