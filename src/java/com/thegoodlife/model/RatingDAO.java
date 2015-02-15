/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thegoodlife.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 *
 * @author locnguyen
 */
public class RatingDAO {
    
    private static final String INSERT_ONE_RATING = "INSERT into rating values (?,?,?,?)";
    private static final String RETRIEVE_ONE_RATING = "SELECT * from rating where fbID = ? AND offerID = ? ";
    private static final String RETRIEVE_ALL_RATING = "SELECT * from rating";
    private static final String UPDATE_ONE_RATING = "Update rating set rating = ? WHERE fbID = ? AND offerID = ?";
    private static final String RETRIEVE_All_RATING_OF_USER = "SELECT * from rating where fbID = ?";
    private static final String RETRIEVE_All_RATING_OF_DEAL = "SELECT * from rating where offerID = ?";
    
    
    public static void insertOneRating(String fbID, int offerID, int subCatID, int rate){
        Connection conn = null;
        PreparedStatement pst = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            pst = conn.prepareStatement(INSERT_ONE_RATING);
            pst.setString(1, fbID);
            pst.setInt(2, offerID);
            pst.setInt(3, subCatID);
            pst.setInt(4, rate);
            pst.executeUpdate();
            
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            ConnectionManager.close(conn, pst, rs);
        }
    }
    
    public static Rating retrieveOneRating(String fbID, int offerID){
        Rating r = null;
        Connection conn = null;
        PreparedStatement pst = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            pst = conn.prepareStatement(RETRIEVE_ONE_RATING);
            pst.setString(1, fbID);
            pst.setInt(2, offerID);
            rs = pst.executeQuery();
            if (rs.next()) {
                r = new Rating(rs.getString("fbID"), rs.getInt("offerID"), rs.getInt("subCatID"), rs.getInt("rate"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            ConnectionManager.close(conn, pst, rs);
        }
        
        return r;
    }
    
    public static ArrayList<Rating> retrieveAllRating(){
        ArrayList<Rating> ratingArr = new ArrayList<>();
        Connection conn = null;
        PreparedStatement pst = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            pst = conn.prepareStatement(RETRIEVE_ALL_RATING);
            rs = pst.executeQuery();
            while (rs.next()) {
                ratingArr.add(new Rating(rs.getString("fbID"), rs.getInt("offerID"), rs.getInt("subCatID"), rs.getInt("rate")) );
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            ConnectionManager.close(conn, pst, rs);
        }
        
        return ratingArr;
    }
    
    public static void updateOneRating(String fbID, int offerID, int rate){
        Connection conn = null;
        PreparedStatement pst = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            pst = conn.prepareStatement(UPDATE_ONE_RATING);
            pst.setInt(1, rate);
            pst.setString(2, fbID);
            pst.setInt(3, offerID);
            pst.executeUpdate();
            
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            ConnectionManager.close(conn, pst, rs);
        }
    }
    
    
    public static ArrayList<Rating> retrieveAllRatingOfUser(String fbID){
        
        ArrayList<Rating> ratingArr = new ArrayList<>();
        Connection conn = null;
        PreparedStatement pst = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            pst = conn.prepareStatement(RETRIEVE_All_RATING_OF_USER);
            pst.setString(1, fbID);
            rs = pst.executeQuery();
            while (rs.next()) {
                ratingArr.add(new Rating(rs.getString("fbID"), rs.getInt("offerID"), rs.getInt("subCatID"), rs.getInt("rate")) );
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            ConnectionManager.close(conn, pst, rs);
        }
        
        return ratingArr;
    }
    
    public static ArrayList<Rating> retrieveAllRatingOfDeal(int offerID){
        
        ArrayList<Rating> ratingArr = new ArrayList<Rating>();
        Connection conn = null;
        PreparedStatement pst = null;
        ResultSet rs = null;
        
        try {
            conn = ConnectionManager.getConnection();
            pst = conn.prepareStatement(RETRIEVE_All_RATING_OF_DEAL);
            pst.setInt(1, offerID);
            rs = pst.executeQuery();
            while (rs.next()) {
                ratingArr.add(new Rating(rs.getString("fbID"), rs.getInt("offerID"), rs.getInt("subCatID"), rs.getInt("rate")) );
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            ConnectionManager.close(conn, pst, rs);
        }
        
        return ratingArr;
    }
    
    
    
}
