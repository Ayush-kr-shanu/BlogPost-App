import React, { useState, useEffect } from 'react';
import { Box, Text, List, ListItem, Heading, Divider, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const url="http://13.211.33.106:4500/"

const MyPosts = () => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
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

  const handleDeletePost = async (postId) => {
    const token = Cookies.get('token');
    try {
      await fetch(`${url}api/post-head/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log(`Deleted post with ID ${postId}`);

      // After successful deletion, update the userPosts state
      setUserPosts((prevUserPosts) => prevUserPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <Box maxW="800px" mx="auto" mt="4" p="4" bg="gray.100" borderRadius="md" boxShadow="md">
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
              <Box mt="4">
                <Button colorScheme="red" onClick={() => handleDeletePost(post.id)}>
                  Delete
                </Button>
                <Link to={`/post/${post.id}`} className="btn btn-primary">
                  Read More
                </Link>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default MyPosts;
