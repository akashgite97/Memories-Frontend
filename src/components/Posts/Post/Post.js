import React from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { likePost, deletePost } from "../../../redux/slices/postSlice";
import { updateFormState } from "../../../redux/slices/formSlice";
import ThumbUpAltIconOutlined from "@material-ui/icons/ThumbUpAltOutlined";

const Post = ({
  post: { image, title, tags, message, createdAt, creator, likes, _id },
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation(["common"]);
  const user = JSON.parse(localStorage.getItem("profile"));

  const Like = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === user?.result?._id) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}  `}
        </>
      ) : (
        <>
          <ThumbUpAltIconOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        {" "}
        <ThumbUpAltIconOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }} className={classes.card}>
        <CardMedia
          component="img"
          title={title}
          image={image}
          alt="post image"
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{creator}</Typography>
          <Typography variant="body2">{moment(createdAt).fromNow()}</Typography>
        </div>
        {user?.result?._id === creator && (
          <div className={classes.overlay2}>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => dispatch(updateFormState("postId", _id))}
            >
              <MoreHorizIcon fontSIze="default" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {tags.map((tag) => `#${tag}`)}
          </Typography>
        </div>
        <CardContent>
          <Typography className={classes.title} variant="h5" gutterBottom>
            {message}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
          <Button
            aria-label="like"
            disabled={!user?.result}
            size="small"
            color="primary"
            onClick={() => dispatch(likePost(_id))}
          >
            <Like />
          </Button>
          {user?.result?._id === creator && (
            <Button
              aria-label="delete"
              size="small"
              color="primary"
              onClick={() => dispatch(deletePost(_id))}
            >
              <DeleteIcon fontSize="small" />
              {t("delete")}
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
