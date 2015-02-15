/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thegoodlife2015.controller;

import com.thegoodlife2015.model.RatingDAO;
import com.thegoodlife2015.model.Rating;
import java.util.ArrayList;
/**
 *
 * @author locnguyen
 */
public class TGLController {
    
    /**
     * Retrieves all the rating available
     *
     * @return ArrayList of Course object
     */
    public static ArrayList<Rating> retrieveAllRating() {
        ArrayList<Rating> allRating = RatingDAO.retrieveAllRating();
        return allRating;
    }
    
    public static Rating retrieveOneRating(String fbID, int offerID) {
        Rating r = RatingDAO.retrieveOneRating(fbID, offerID);
        return r;
    }
    
    public static void insertOrUpdateOneRating(String fbID, int offerID, int subCatID, int rate){
        System.out.println("insertt");
        if (validateRatingExist( fbID,  offerID)){
            RatingDAO.updateOneRating(fbID, offerID, rate);
        }else{
            RatingDAO.insertOneRating(fbID, offerID, subCatID, rate);
        }
    }
    
    public static boolean validateRatingExist(String fbID, int offerID){
        Rating rating = RatingDAO.retrieveOneRating(fbID, offerID);
        return rating != null;
    }
    

    
}
