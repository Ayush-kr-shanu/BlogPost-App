import React, { useState, useEffect } from 'react';
import { Box, Text, List, ListItem, Heading, Divider, Button } from '@chakra-ui/react';
import Cookies from 'js-cookie';

const MyPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  

  useEffect(() => {
    // Fetch user's posts from the API
    const fetchUserPosts = async () => {
        const url='http://localhost:4500/'
        const token = Cookies.get('token');
      try {
        const response = await fetch(`${url}api/my-post`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user posts');
        }

        const data = await response.json();
        setUserPosts(data.userPost);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      await fetch(`http://localhost:4500/api/post/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
      });
      console.log(`Deleted post with ID ${postId}`);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleUpdatePost = async (postId, title, content) => {
    try {
      await fetch(`http://localhost:4500/api/post/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify({ title, content }),
      });
      // Update the state or fetch the posts again to reflect the changes
      // For example, you can call a function to fetch the updated posts
      console.log(`Updated post with ID ${postId}`);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <Box maxW="500px" mx="auto" mt="4" p="4" bg="gray.100" borderRadius="md" boxShadow="md">
      {userPosts.length === 0 ? (
        <Text color="red.500" fontWeight="bold">
          No posts found.
        </Text>
      ) : (
        <List spacing="4">
          {userPosts.map((post) => (
            <ListItem key={post.id} p="4" bg="white" borderRadius="md" boxShadow="sm">
              <Heading as="h2" size="lg" mb="2">
                {post.title}
              </Heading>
              <Text fontWeight="medium" mb="2">
                {post.description}
              </Text>
              <Divider my="2" />
              <Text>{post.content}</Text>
              <Box mt="4">
                <Button colorScheme="teal" mr="2" onClick={() => handleUpdatePost(post.id)}>
                  Update
                </Button>
                <Button colorScheme="red" onClick={() => handleDeletePost(post.id)}>
                  Delete
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default MyPosts;
