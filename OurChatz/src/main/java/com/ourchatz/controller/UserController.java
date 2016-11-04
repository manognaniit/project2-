package com.ourchatz.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
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
	 @RequestMapping(value = "/getUser", method = RequestMethod.GET, headers = "Accept=application/json")  
	 public List<User> getUsers()
	 {
		 List<User> users=userDao.listUsers();
		return users;
	 }
	 @RequestMapping(value = "/updateUser", method = RequestMethod.PUT, headers = "Accept=application/json")  
	 public void updateUser(@RequestBody User user)
	 {
		 userDao.updateUser(user);
		 
	 }
@RequestMapping(value="/getUser/{id}",method=RequestMethod.GET,headers = "Accept=application/json")
public @ResponseBody User getUserById(@PathVariable("id") int id)
{
	 System.out.println("User Id:"+id);
	 return userDao.getUserById(id);
}
@RequestMapping(value="/authenticate", method=RequestMethod.POST,headers="Accept=application/json")
public int authenticateUser(@RequestBody User user)
{
	 System.out.println("username:"+user.getUsername());
	 System.out.println("password:"+user.getPassword());
int result=0;
	 result=userDao.validateUser(user.getUsername(),user.getPassword());
	 System.out.println("result is:"+result);
	 return result;
}

}
