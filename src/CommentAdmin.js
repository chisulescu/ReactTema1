import React from "react";
import StarRatingComponent from 'react-star-rating-component';
import {Button} from "reactstrap";
import Cookies from "universal-cookie";
import axios from "axios";
export default function CommentAdmin(props) {
    const { name, message, time, rating, id } = props.comment;

    function deleteComment(id) {
        const cookies = new Cookies();
        const token = cookies.get('token');
        console.log("comment delete");
        console.log(props.comment);
        axios
            .delete(`/comments/`+id + '/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            .catch(error => console.log(error));
        window.location.reload();
    }

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
                <Button size="sm" color="danger" onClick={() => deleteComment(id)}>Delete</Button>
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