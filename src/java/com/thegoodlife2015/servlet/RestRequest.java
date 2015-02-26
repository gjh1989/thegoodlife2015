/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thegoodlife2015.servlet;

import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.servlet.ServletException;

/**
 *
 * @author locnguyen
 */
    public class RestRequest {
    // Accommodate two requests, one for all resources, another for a specific resource
    private Pattern regExAllPattern = Pattern.compile("/");
    private Pattern regExIdPattern = Pattern.compile("/([0-9]*)");

    private String fbID;
    private Integer offerID;

    public RestRequest(String pathInfo) throws ServletException, IOException {
      // regex parse pathInfo
      Matcher matcher;

      // Check for ID case first, since the All pattern would also match
      matcher = regExIdPattern.matcher(pathInfo);
      if (matcher.find()) {
        fbID = matcher.group(1);
      }
      if (matcher.find()) {
        offerID = Integer.parseInt(matcher.group(1));
        return;
      }

      matcher = regExAllPattern.matcher(pathInfo);
      if (matcher.find()) return;
      throw new ServletException("Invalid URI");
    }

    public String getFbID() {
        return fbID;
    }

    public void setFbID(String fbID) {
        this.fbID = fbID;
    }

    public Integer getOfferID() {
        return offerID;
    }

    public void setOfferID(Integer offerID) {
        this.offerID = offerID;
    }


  }
