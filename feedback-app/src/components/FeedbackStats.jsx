import {useContext} from "react"
import FeedbackContext from "../context/FeedbackContext";

function FeedbackStats() {
	const {feedback} = useContext(FeedbackContext)
	//calculate ratings average
	let averageRatings = 0;
	feedback.map((item) => {
		return (averageRatings += parseFloat(item.rating) / feedback.length);
	});

	if (averageRatings === 0 && feedback.length === 0) {
		return <div></div>;
	}
	averageRatings = averageRatings.toFixed(1).replace(/[.,]0$/, "");

	return (
		<div className="feedback-stats">
			<h4>{feedback.length} Review(s)</h4>
			<h4>Average Rating: {averageRatings}</h4>
		</div>
	);
}


export default FeedbackStats;
