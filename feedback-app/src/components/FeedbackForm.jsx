import { v4 as uuidv4 } from "uuid";
import { useState, useContext, useEffect } from "react";
import Card from "./share/Card";
import Button from "./share/Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../context/FeedbackContext"

function FeedbackForm() {
	const {addNewFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)
	
	

	const [text, setText] = useState("");

	const [rating, setRating] = useState(10);
	const [btnDisable, setBtnDisable] = useState(true);
	const [message, setMessage] = useState("");
	const [input, setInput] = useState("");
	const [defaultRating, setDefaultRating] = useState(false);

	const handleRatingChange = (value) => {
		setRating(value);
		setDefaultRating(false);
	};

	const handleTextChange = ({ target: { value } }) => {
		if (value === "") {
			setMessage(null);
			setBtnDisable(true);
		} else if (value !== "" && value.trim().length < 10) {
			setMessage("Please, text must be at least 10 characters long");
			setBtnDisable(true);
		} else {
			setMessage(null);
			setBtnDisable(false);
		}
		setText(value);
		setInput(value);
	};

	const handleAdd = (e) => {
		e.preventDefault();
		const newFeedback = {
			id: uuidv4(),
			rating: parseInt(rating),
			text,
		};
		setInput("");
		setDefaultRating(true);
		setBtnDisable(true);

		if(feedbackEdit.edit===true){
			updateFeedback({
				id:feedbackEdit.item.id,
				rating: parseInt(rating),
				text,
			});
		} else{
			addNewFeedback(newFeedback);
		}
	};
	
useEffect(()=>{
		if(feedbackEdit.edit){

			setBtnDisable(false)
			setInput(feedbackEdit.item.text)
			setRating(feedbackEdit.item.rating)
		// setDefaultRating(false)
		// setRating(feedbackEdit.item.rating)
	}
	},[feedbackEdit])

	return (
		<Card>
			<form onSubmit={handleAdd}>
				<h2>How would you rate your service with us?</h2>
				<RatingSelect
					handleRatingChange={handleRatingChange}
					defaultRating={defaultRating}
				/>
				<div className="input-group">
					<input
						onChange={handleTextChange}
						type="text"
						placeholder="Write a review"
						value={input}
					/>
					<Button children={"Send"} type={"submit"} isDisabled={btnDisable} />
				</div>
				{message && <div className="message">{message}</div>}
			</form>
		</Card>
	);
}

export default FeedbackForm;
