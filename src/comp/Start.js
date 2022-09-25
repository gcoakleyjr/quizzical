import React from "react"
import Div100vh from 'react-div-100vh'

export default function Start(props) {
    return (
        <Div100vh id="start-page">
            <div className="start-wrapper">
                <h1>Quizzical</h1>
                <p>Test your knowledge!</p>
                <form onSubmit={props.handleStart}>
                    <label htmlFor="category">Select a category.</label>
                    <br />
                    <select
                        id="category"
                        value={props.formData.category}
                        onChange={props.handleChange}
                        name="category"
                    >
                        <option value="">Select</option>
                        <option value="15">Video Games</option>
                        <option value="11">Film</option>
                        <option value="27">Animals</option>
                        <option value="26">Celebrities</option>
                        <option value="22">Geography</option>
                    </select>
                    <br />
                    <button className="start-btn">Start Quiz</button>
                </form>
            </div>
        </Div100vh>
    )
}