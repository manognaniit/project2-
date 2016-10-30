package com.ourchatz.dao;

import java.util.List;

import com.ourchatz.model.User;

public interface UserDao {
void registerUser(User user);
List<User> listUsers();	
}
