/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thegoodlife.servlet;

import com.thegoodlife.controller.TGLController;
import com.thegoodlife.model.Rating;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author locnguyen
 */
public class retrieveRating extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    private class RestRequest {
    // Accommodate two requests, one for all resources, another for a specific resource
    private Pattern regExAllPattern = Pattern.compile("/");
    private Pattern regExIdPattern = Pattern.compile("/([0-9]*)");
 
    private Integer fbID;
    private Integer offerID;
    
    public RestRequest(String pathInfo) throws ServletException, IOException {
      // regex parse pathInfo
      Matcher matcher;
 
      // Check for ID case first, since the All pattern would also match
      matcher = regExIdPattern.matcher(pathInfo);
      if (matcher.find()) {
        fbID = Integer.parseInt(matcher.group(1));
      }
      if (matcher.find()) {
        offerID = Integer.parseInt(matcher.group(1));
        return;
      }
      
      matcher = regExAllPattern.matcher(pathInfo);
      if (matcher.find()) return;
      throw new ServletException("Invalid URI");
    }

    public Integer getFbID() {
        return fbID;
    }

    public void setFbID(Integer fbID) {
        this.fbID = fbID;
    }

    public Integer getOfferID() {
        return offerID;
    }

    public void setOfferID(Integer offerID) {
        this.offerID = offerID;
    }
 
    
  }
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try(PrintWriter out = response.getWriter()) {
            
            /* TODO output your page here. You may use following sample code. */
            RestRequest resourceValues = new RestRequest(request.getPathInfo());
            String fbID = ""+ resourceValues.getFbID();
            int offerID = resourceValues.offerID;
            Rating r = TGLController.retrieveOneRating(fbID, offerID);
            out.println(r.getRate());
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try(PrintWriter out = response.getWriter()) {
            
            /* TODO output your page here. You may use following sample code. */
            out.println(122343421);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
