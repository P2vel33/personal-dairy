import { createContext, useState } from 'react';

export const PostContext = createContext({
  title: '',
  tag: '',
  date: '',
  post: ''
});

export const PostContextProvider = ({ children }) => {
  const [currentPost, setCurrentPost] = useState({
    title: '',
    tag: '',
    date: '',
    post: ''
  });
  return <PostContext.Provider value={{ currentPost, setCurrentPost }}>{children}</PostContext.Provider>;
};
