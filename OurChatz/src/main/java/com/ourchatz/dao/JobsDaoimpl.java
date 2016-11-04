package com.ourchatz.dao;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ourchatz.model.Jobs;

@Transactional
@Repository
public class JobsDaoimpl implements JobsDao  {
@Autowired
SessionFactory sessionFactory;

public void createJobs(Jobs jobs) {
	sessionFactory.getCurrentSession().save(jobs);
	
}

}
