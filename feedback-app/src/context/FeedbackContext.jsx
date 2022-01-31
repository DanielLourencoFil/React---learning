import {createContext, useState} from "react";
import FeedbackData from "../data/FeedbackData";


const FeedbackContext = createContext() 


export const FeedbackProvider = ({children}) =>{
    
const [feedback, setFeedback] = useState(FeedbackData);

const [feedbackEdit, setFeedbackEdit] = useState({
    item:{},
    edit:false,
});

const deleteFeedback = (id) => {
		if (window.confirm("Are you sure you want to delete the feedback?")) {
			const newFeedback = feedback.filter((item) => item.id !== id);
			setFeedback(newFeedback);
		}
	};

const addNewFeedback = (newFeedback) => {
		setFeedback([newFeedback, ...feedback]);
	};

const editFeedback = (item)=>{
    
    setFeedbackEdit(
        {
         item,  
         edit:true,
        }
        )
}

const updateFeedback = (updItem) =>{  
    setFeedback(feedback.map(item => item.id === updItem.id? {...item, ...updItem}: item ))

    // let editFeedback = [...feedback]
    // editFeedback.map(item => {
    //     if(item.id === updItem.id){
    //         return editFeedback[editFeedback.indexOf(item)] = updItem
    //     }
    // })
    // setFeedback(editFeedback)
}
    return <FeedbackContext.Provider 
    value={{
        feedback,
        deleteFeedback,
        addNewFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
    }
    }
    >
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext
