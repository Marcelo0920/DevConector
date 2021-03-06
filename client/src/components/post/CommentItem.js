import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {deleteComment} from '../../actions/post';

const CommentItem = ({deleteComment, postId, comment: {_id, text, name, avatar, user, date}, auth}) => {
    
    return(
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to = {`/profile/${user}`}>
                <img className="round-img" src= {avatar} alt = "name" />
                <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">
                {text}
                </p>
                <p className="post-date">
                Posted on <Moment format = "YYYY/MM/DD">{date}</Moment>
                </p>
                {/*Hay un error con el Post ID, después de eliminar un comentario de discusión pasa este se pierde, revisar el Post.js de Post */}
                {!auth.loading && user === auth.user._id &&  (
                    <button className = "btn btn-danger" onClick = {e => deleteComment(postId, _id)} type = "button">
                        <i className = "fas fa-times"></i>
                    </button>
                )}
            </div>
        </div>

    )
}

CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {deleteComment})(CommentItem);