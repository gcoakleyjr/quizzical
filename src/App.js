import React from "react"
import Start from "./comp/Start.js"
import Question from "./comp/Question.js"
import Div100vh from 'react-div-100vh'
import { nanoid } from "nanoid"

export default function App() {
    const [quizQuestion, setQuizQuestion] = React.useState([{ question: "" }])
    const [startQuiz, setStartQuiz] = React.useState(false)
    const [endQuiz, setEndQuiz] = React.useState(false)
    const [quizAnswers, setQuizAnswers] = React.useState([])
    const [formData, setFormData] = React.useState({ category: "" })
    const [startNewGame, setNewGame] = React.useState(0)
    const [score, setScore] = React.useState(0)

    //Updates the chosen Quiz Category
    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    //Starts the Quiz
    function handleStart(event) {
        event.preventDefault()
        setStartQuiz(true)
    }

    //API request
    React.useEffect(() => {
        async function getData() {
            const res = await fetch(`https://opentdb.com/api.php?amount=5&category=${formData.category || 15}&difficulty=easy&type=multiple&encode=base64`)
            const data = await res.json()

            //Sorts API data into 2 states, Question and Answers, and add it into an object
            setQuizQuestion(data.results.map(element => {
                return { question: atob(element.question) }
            }))

            setQuizAnswers(data.results.map(element => {
                const array = [
                    {
                        answer: atob(element.correct_answer),
                        id: nanoid(),
                        isSelected: false,
                        isCorrect: true
                    },
                    ...element.incorrect_answers.map(value => {
                        return {
                            answer: atob(value),
                            id: nanoid(),
                            isSelected: false,
                            isCorrect: false
                        }
                    })
                ]
                //shuffle the answers
                const random = Math.floor(Math.random() * 5)
                const answer = array.shift()
                array.splice(random, 0, answer)
                return array
            }))
        }
        getData()
    }, [formData, startNewGame])

    //Changes style when Selected
    function selectedAnswer(id, questionId) {
        setQuizAnswers(prevState => {
            return prevState.map((question, index) => {
                return questionId === index ?
                    question.map(element => {
                        return element.id === id ?
                            { ...element, isSelected: true } : { ...element, isSelected: false }
                    }) : question
            })
        })
    }

    //Check the answers
    function checkAnswers() {
        setEndQuiz(true)
        setScore(prev => {
            let tally = 0
            quizAnswers.forEach(questions => {
                questions.forEach(element => {
                    element.isSelected && element.isCorrect ? tally++ : <div></div>
                })
            })
            return tally
        })

    }

    function newGame() {
        setEndQuiz(false)
        setStartQuiz(false)
        setNewGame(prev => prev + 1)
    }


    //HTML question and answer Elements
    let elements = <h2>Preparing Quiz...</h2>
    if (startQuiz) {
        elements = quizQuestion.map((element, index) => {
            return <Question
                key={nanoid()}
                qId={index}
                question={element.question}
                allAnswers={quizAnswers[index]}
                selectedAnswer={selectedAnswer}
                endQuiz={endQuiz}
            />
        })
    }


    return (
        <main>
            <div className="blob-wrapper">
                <img className="blob-1" src="./imgs/blob-blue.svg" alt='blob' />
                <img className="blob-2" src="./imgs/blob-yellow.svg" alt='blob' />
            </div>

            {startQuiz ?
                <Div100vh id="question-page">
                    <div className="question-wrapper">
                        {elements}
                        {endQuiz ?
                            <div className="end-wrapper">
                                <p className="score-text">You scored {score}/{quizQuestion.length}!
                                    {score === 0 ? " Wow..." : score < 5 ? " Not bad." : " Amazing!"}</p>
                                <button className="new-btn" onClick={newGame}>Play again</button>
                            </div>
                            :
                            <div className="end-wrapper">
                                <button className="new-btn" onClick={checkAnswers}>Check answers</button>
                            </div>
                        }
                    </div>
                </Div100vh>
                :
                <Start
                    handleStart={handleStart}
                    handleChange={handleChange}
                    formData={formData}
                />
            }
        </main>
    )
}