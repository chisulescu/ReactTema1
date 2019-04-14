import React from "react";
import StarRatingComponent from 'react-star-rating-component';
export default function Comment(props) {
    const { name, message, time, rating } = props.comment;

    return (
        <div className="media mb-3">
            <img
                className="mr-3 bg-light rounded"
                width="48"
                height="48"
                src={`https://api.adorable.io/avatars/48/${name.toLowerCase()}@adorable.io.png`}
                alt={name}
            />



            <div className="media-body p-2 shadow-sm rounded bg-light border">
                <small className="float-right text-muted">{time}</small>
                <h6 className="mt-0 mb-1 text-muted">{name}</h6>
                <div>{message}</div>
                <StarRatingComponent
                    name="rate2"
                    editing={false}

                    starCount={5}
                    value={rating}
                />
            </div>

        </div>
    );
}