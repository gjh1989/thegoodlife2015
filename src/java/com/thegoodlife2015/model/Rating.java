/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thegoodlife2015.model;

/**
 *
 * @author locnguyen
 */
public class Rating {
    
    private String fbID;
    private int offerID;
    private int catID;
    private int subCatID;
    private int rate;

    public Rating(String fbID, int offerID, int catID, int subCatID, int rate) {
        this.fbID = fbID;
        this.offerID = offerID;
        this.catID = catID;
        this.subCatID = subCatID;
        this.rate = rate;
    }

    public String getFbID() {
        return fbID;
    }

    public void setFbID(String fbID) {
        this.fbID = fbID;
    }

    public int getOfferID() {
        return offerID;
    }

    public void setOfferID(int offerID) {
        this.offerID = offerID;
    }

    public int getCatID() {
        return catID;
    }

    public void setCatID(int catID) {
        this.catID = catID;
    }

    public int getSubCatID() {
        return subCatID;
    }

    public void setSubCatID(int subCatID) {
        this.subCatID = subCatID;
    }

    public int getRate() {
        return rate;
    }

    public void setRate(int rate) {
        this.rate = rate;
    }
    
    
    
}
