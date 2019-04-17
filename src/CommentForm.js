import React, { Component } from "react";
import StarRatingComponent from 'react-star-rating-component';
import Cookies from "universal-cookie/es6/Cookies";



export default class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: "",
            rating: "2",

            comment: {
                name: "",
                message: ""
            }
        };

        // bind context to methods
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onStarClick = this.onStarClick.bind(this);
    }

    /**
     * Handle form input field changes & update the state
     */
    handleFieldChange = event => {
        const { value, name } = event.target;

        this.setState({
            ...this.state,
            comment: {
                ...this.state.comment,
                [name]: value
            }
        });
    };

    /**
     * Form submit handler
     */
    onSubmit(e) {
        // prevent default form submission
        e.preventDefault();
        if (!this.isFormValid()) {
            this.setState({ error: "All fields are required." });
            return;
        }

        // loading status and clear error
        this.setState({ error: "", loading: true });
        let {rating} = this.state;
        console.log(rating);
        // persist the comments on server
        let { comment } = this.state;
        const cookies = new Cookies();
        comment.time=new Date().toISOString().slice(0, 19).replace('T', ' ');;
        let id = cookies.get("doctor_id");
        comment.doctor_id=id;
        comment.rating=rating;
        console.log(cookies.get("userName"));
        comment.name=cookies.get("userName");
        // this.setState({comment: comment});

        fetch(`/api/comments/`, {
            method: 'POST',
            headers: {
                 'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment),
        })
            .then(res =>{
                const contentType = res.headers.get("content-type");
                console.log("fetch");
                this.setState({ isLoading: false});
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return res.json()
                } else {
                    return res.text().then(text => {

                        console.log(text);
                        //this.props.history.push('/');
                        }
                    )
                }
            })
                .then(res => {
                    if (res.error) {
                        this.setState({ loading: false, error: res.error });
                    } else {
                    // add time return from api and push comment to parent state
                        comment.name = res.name;
                        this.props.addComment(comment);

                    // clear the message box
                        this.setState({
                            loading: false,
                            comment: { ...comment, message: "" }
                        });
                    }
                })
            .catch(err => {
                this.setState({
                    error: "Something went wrong while submitting form.",
                    loading: false
                });
            });
    }

    isFormValid() {
        return this.state.rating !== "" && this.state.comment.message !== "";
        //...
    }

    onStarClick(nextValue, prevValue, name) {
        console.log(nextValue);
        this.setState({rating: nextValue});
    }

    renderError() {
        return this.state.error ? (
            <div className="alert alert-danger">{this.state.error}</div>
        ) : null;
    }



    render() {
        const cookies = new Cookies();
        let language = 'en.json';
        if(cookies.get('language')) {
            language = cookies.get('language');
        }
        let { comment} = require('./' + language);
        return (
            <React.Fragment>
                <form method="post" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        {/*<input*/}
                            {/*onChange={this.handleFieldChange}*/}
                            {/*value={this.state.comment.name}*/}
                            {/*className="form-control"*/}
                            {/*placeholder="😎 Your Name"*/}
                            {/*name="name"*/}
                            {/*type="text"*/}
                        {/*/>*/}
                    </div>
                    <div className="form-group">
                    <StarRatingComponent
                         value={this.state.rating}
                        name="rating"
                        editing={true}
                        onStarClick={this.onStarClick}

                        starCount={5}

                    />
                    </div>
                    <div className="form-group">
            <textarea
                onChange={this.handleFieldChange}
                value={this.state.comment.message}
                className="form-control"
                placeholder="🤬 Your Comment"
                name="message"
                rows="5"
            />
                    </div>

                    {this.renderError()}

                    <div className="form-group">
                        <button disabled={this.state.loading} className="btn btn-primary">
                            {comment} ➤
                        </button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}