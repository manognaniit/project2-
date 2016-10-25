package com.ourchatz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ourchatz.dao.UserDao;
import com.ourchatz.model.User;

@RestController
public class UserController {
	@Autowired
	UserDao userDao;
	@RequestMapping(value="/registerUser",headers="Accept=application/json",method=RequestMethod.POST)
	public void saveUser(@RequestBody User user){
		userDao.registerUser(user);
		
	}

}
