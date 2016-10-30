package com.ourchatz.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ourchatz.dao.BlogDao;
import com.ourchatz.model.Blog;



@RestController
public class BlogController {
	@Autowired
	BlogDao blogDao;
	@RequestMapping(value="/createBlog",headers="Accept=application/json",method=RequestMethod.POST)
	public void saveUser(@RequestBody Blog blog){
		blogDao.createBlog(blog);
		
	}
	@RequestMapping(value="/viewBlogs",method=RequestMethod.GET)
	public List<Blog> getBlogs(){
		List<Blog> blogs=blogDao.viewBlogs();
		return blogs;
	}
		


}
