// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package org.sgo.rootest.domain;

import java.lang.String;
import java.util.Calendar;

privileged aspect Issue_Roo_JavaBean {
    
    public String Issue.getSummary() {
        return this.summary;
    }
    
    public void Issue.setSummary(String summary) {
        this.summary = summary;
    }
    
    public Calendar Issue.getRaisedDate() {
        return this.raisedDate;
    }
    
    public void Issue.setRaisedDate(Calendar raisedDate) {
        this.raisedDate = raisedDate;
    }
    
}
