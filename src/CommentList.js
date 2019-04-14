import React from "react";
import Comment from "./Comment";
import Cookies from "universal-cookie";
export default function CommentList(props) {

    const cookies = new Cookies();
    let language = 'en.json';
    if(cookies.get('language')) {
        language = cookies.get('language');
    }
    let { commentMessage} = require('./' + language);

    return (
        <div className="commentList">
            <h5 className="text-muted mb-4">
                <span className="badge badge-success">{props.comments.length}</span>{" "}
                Comment{props.comments.length > 0 ? "s" : ""}
            </h5>

            {props.comments.length === 0 && !props.loading ? (
                <div className="alert text-center alert-info">
                    {commentMessage}
                </div>
            ) : null}

            {props.comments.map((comment, index) => (
                <Comment key={index} comment={comment} />
            ))}
        </div>

    );
}