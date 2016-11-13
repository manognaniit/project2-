package com.ourchatz.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ourchatz.dao.JobsDao;
import com.ourchatz.model.Jobs;
import com.ourchatz.model.User;


@RestController
public class JobsController {
	@Autowired
	JobsDao jobsDao;
	@RequestMapping(value="/createJobs",headers="Accept=application/json",method=RequestMethod.POST)
	public void saveJobs(@RequestBody Jobs jobs){
		jobsDao.createJobs(jobs);
		}
	 
	

}
