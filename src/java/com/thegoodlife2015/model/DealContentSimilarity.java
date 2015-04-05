/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thegoodlife2015.model;

import java.util.Collection;
import org.apache.mahout.cf.taste.common.Refreshable;
import org.apache.mahout.cf.taste.common.TasteException;
import org.apache.mahout.cf.taste.similarity.ItemSimilarity;

/**
 *
 * @author locnguyen
 */
public class DealContentSimilarity implements ItemSimilarity {

    @Override
    public double itemSimilarity(long l, long l1) throws TasteException {
        double similar = 0.0;
        if (l % 2 == 0 && l%2 == 0){
            similar = 1;
        } else{
            similar = 0.5;
        }
        return similar;
    }

    @Override
    public double[] itemSimilarities(long l, long[] longs) throws TasteException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public long[] allSimilarItemIDs(long l) throws TasteException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void refresh(Collection<Refreshable> clctn) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
