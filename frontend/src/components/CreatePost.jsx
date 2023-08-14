// components/CreatePostForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Textarea, useToast } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import url from './url';


const CreatePostForm = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get('token');
      const response = await fetch(`${url}api/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`, // Use 'Bearer' prefix for JWT token
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Post Created',
          description: 'Your post has been successfully created.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        // Redirect to the home page after successful submission
        navigate('/');
      } else {
        // Handle error here if the API call was not successful
        toast({
          title: 'Error',
          description: 'An error occurred while creating the post API ERROR. Please try again later.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while creating the post. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="500px" mx="auto" mt="4">
      <form onSubmit={handleSubmit}>
        <FormControl mb="4">
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Content</FormLabel>
          <Textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            h="200px" // Set the height of the textarea here
          />
        </FormControl>
        <Button colorScheme="teal" type="submit">
          Create Post
        </Button>
      </form>
    </Box>
  );
};

export default CreatePostForm;
