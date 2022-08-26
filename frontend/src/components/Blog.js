import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Blog = ({ title, description, imageURL, userName, isUser, id }) => {
  console.log(isUser);
  const navigate = useNavigate();
  const handleEdit = e => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5002/api/blog/${id}`)
      .catch(err => console.log('error>>>', err));
    const data = res.data;
    return data;
  };
  const handleDelete = e => {
    deleteRequest()
      .then(() => navigate('/'))
      .then(() => navigate('/blogs'));
  };

  return (
    <div>
      <Card
        sx={{
          width: '45%',
          margin: 'auto',
          mt: 2,
          padding: 2,
          boxShadow: '5px 5px 10px #ccc',
          ':hover': { boxShadow: '10px 10px 20px #ccc' },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: 'auto' }}>
              <EditIcon color="primary" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        )}

        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
              {userName && userName.charAt(0)}
            </Avatar>
          }
          title={title}
        />
        <CardMedia component="img" height="194" image={imageURL} alt={title} />
        <CardContent>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary">
            <b>{userName}</b>:{description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
