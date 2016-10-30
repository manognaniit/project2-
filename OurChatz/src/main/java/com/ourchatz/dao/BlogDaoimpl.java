package com.ourchatz.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ourchatz.model.Blog;
@Transactional
@Repository
public class BlogDaoimpl implements BlogDao {
@Autowired
SessionFactory sessionFactory;

public void createBlog(Blog blog) {
	sessionFactory.getCurrentSession().save(blog);
	
}

public List<Blog> viewBlogs() {
	Session session=sessionFactory.getCurrentSession();
	List<Blog> list=session.createCriteria(Blog.class).list();
	return list;
}

}
