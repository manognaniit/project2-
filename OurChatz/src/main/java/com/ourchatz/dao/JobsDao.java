package com.ourchatz.dao;

import java.util.List;


import com.ourchatz.model.Jobs;

public interface JobsDao {
	void createJobs(Jobs jobs);
	List<Jobs> viewJobs();
	 void deleteJob(int id);
	   void updateJob(Jobs job);
	   Jobs viewJob(int id);
	  

}
