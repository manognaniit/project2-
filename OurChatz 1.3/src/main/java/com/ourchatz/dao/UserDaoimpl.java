package com.ourchatz.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ourchatz.model.User;
@Transactional
@Repository
public class UserDaoimpl implements UserDao {
@Autowired
SessionFactory sessionFactory;

	public void registerUser(User user) {
		Session session=sessionFactory.getCurrentSession();
		user.setRole("ROLE_USER");
		session.save(user);
		}
	public List<User> listUsers() {
		Session session=sessionFactory.getCurrentSession();
		
		  List<User> list=session.createCriteria(User.class).list();
		
		return list;
	}
	public void updateUser(User user) {
		sessionFactory.getCurrentSession().update(user);
		
	}
	public User getUserById(int id) {
		Session session=sessionFactory.getCurrentSession();
		User user=(User)session.get(User.class, id);
		return user;
	}
	public int validateUser(String username, String password) {
		
		return 0;
	}
}
