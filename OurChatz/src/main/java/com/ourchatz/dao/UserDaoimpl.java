package com.ourchatz.dao;

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
		sessionFactory.getCurrentSession().save(user);
		
	}

}
