import React from "react"
import { nanoid } from "nanoid"


export default function Question(props) {
    
    const choices = props.allAnswers
        
    //HTML for each choice 
    const choiceArray = choices.map(choice => {
        const styles ={
            backgroundColor: props.endQuiz && choice.isCorrect ? "#94D7A2" 
            : props.endQuiz && choice.isSelected ? "#F8BCBC" 
            : choice.isSelected ? "#D6DBF5" : "transparent"  
            // backgroundColor: choice.isSelected ? "#D6DBF5" : "transparent"        
        }

        return <div 
                    key={nanoid()} 
                    className="choice"
                    onClick={() => props.selectedAnswer(choice.id, props.qId)}
                    style={styles}
                >
                    <span>{choice.answer}</span>
                </div>
    })       
    
    return (
        <div>
            <p className="question">{props.question}</p> 
            <div className="choices">{choiceArray}</div>
            <hr />              
        </div>
    )
}