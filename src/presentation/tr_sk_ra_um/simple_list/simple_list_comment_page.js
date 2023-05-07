import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { get_comment_list, insert_comment } from "../../../api/comment_client";
import { Link, useNavigate } from "react-router-dom";
const SimpleListCommentPage = () => {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const location = useLocation();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    get_comment_list(location.state.item.id)
      .then((data) => {
        const commentList = data.map((comment) => comment.comment);
        setCommentList(commentList);
      })
      .catch((error) => {
        console.error("Error fetching sky rain umbrella list:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment !== "") {
      setCommentList([...commentList, comment]);
      setComment("");
      try {
        const data = {
          id: location.state.item.id,
          comment: comment,
          email: "",
        };
        const response = await insert_comment(data);
        console.log("Response from server:", response);
      } catch (error) {
        console.error("Error while submitting data:", error);
      }
    }
  };
  const handleBack = () => {
    navigate("/simple_list", { state: { theme: location.state.item.theme } });
  };
  return (
    <Box mx="auto" mt={3} mb={3} width="100%" maxWidth="sm" textAlign="left">
      <Button
        variant="outlined"
        onClick={handleBack}
        sx={{
          marginLeft: "0px",
          height: "30px",
          width: "150px",
        }}
      >
        前のページに戻る
      </Button>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="subtitle1">テーマ</Typography>
          <Typography variant="subtitle2">
            {location.state.item.theme}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">空</Typography>
          <Typography variant="subtitle2">{location.state.item.sky}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">雨</Typography>
          <Typography variant="subtitle2">
            {location.state.item.rain}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">傘</Typography>
          <Typography variant="subtitle2">
            {location.state.item.umbrella}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <List>
        {commentList.map((comment, index) => (
          <ListItem key={index} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "#00BFFF" }}>?</Avatar>
            </ListItemAvatar>
            <ListItemText secondary={comment} />
          </ListItem>
        ))}
      </List>
      <form onSubmit={handleSubmit}>
        <Box display="flex" alignItems="center">
          <TextField
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="コメントを追加"
            variant="outlined"
            margin="normal"
            size="small"
            InputProps={{
              endAdornment: (
                <Button type="submit" disabled={comment === ""}>
                  <SendIcon />
                </Button>
              ),
            }}
          />
        </Box>
      </form>
    </Box>
  );
};

export default SimpleListCommentPage;
