/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thegoodlife2015.controller;

import com.thegoodlife2015.model.RatingDAO;
import com.thegoodlife2015.model.Rating;
import com.thegoodlife2015.model.RecommendationAlgorithm;
import java.sql.SQLException;
import java.util.ArrayList;
import org.grouplens.lenskit.RecommenderBuildException;
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
    
    public static void insertOrUpdateOneRating(String fbID, int offerID, int catID, int subCatID, int rate){
        if (validateRatingExist( fbID,  offerID)){
            System.out.println("update");
            RatingDAO.updateOneRating(fbID, offerID, rate);
        }else{
            System.out.println("insert");
            RatingDAO.insertOneRating(fbID, offerID, catID, subCatID, rate);
        }
    }
    
    public static boolean validateRatingExist(String fbID, int offerID){
        Rating rating = RatingDAO.retrieveOneRating(fbID, offerID);
        return rating != null;
    }
    
    public static void recAlgo() throws SQLException, RecommenderBuildException{
        RecommendationAlgorithm.RecommendationForADeal();
    }
    

    
}
