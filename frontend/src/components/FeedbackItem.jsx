import PropTypes from "prop-types";
import { FaTimes, FaEdit } from "react-icons/fa"; //fa-> font awesome
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext.js";
import Card from "./share/Card.jsx";

//import FeedbackData from "../data/FeedbackData.js";

function FeedbackItem({ item }) {
  const { deleteFeedback, editFeedback } = useContext(FeedbackContext);

  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      <button onClick={() => deleteFeedback(item.id)} className="close">
        <FaTimes color="purple" />
      </button>
      <button onClick={() => editFeedback(item)} className="edit">
        <FaEdit color="purple" />
      </button>
      <div className="text-display">{item.text}</div>
    </Card>
  );
}

FeedbackItem.propType = {
  item: PropTypes.object.isRequired,
};

export default FeedbackItem;
