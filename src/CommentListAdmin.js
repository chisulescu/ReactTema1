import React from "react";
import CommentAdmin from "./CommentAdmin";
import Cookies from "universal-cookie";
import {Button} from "reactstrap";
export default function CommentListAdmin(props) {

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
                <div >

                    <CommentAdmin key={index} comment={comment} />
                </div>

            ))}
        </div>

    );
}