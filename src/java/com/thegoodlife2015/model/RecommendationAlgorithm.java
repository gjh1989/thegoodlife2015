/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thegoodlife2015.model;


import java.sql.Connection;
import java.sql.SQLException;
import org.grouplens.lenskit.RecommenderBuildException;
import org.grouplens.lenskit.core.LenskitConfiguration;
import org.grouplens.lenskit.core.LenskitRecommender;
import org.grouplens.lenskit.data.sql.BasicSQLStatementFactory;
import org.grouplens.lenskit.data.sql.JDBCRatingDAO;

/**
 *
 * @author locnguyen
 */
public class RecommendationAlgorithm {
    
    public static void RecommendationForADeal() throws SQLException, RecommenderBuildException{
        Connection conn = null;
        try {
            conn = ConnectionManager.getConnection();
            BasicSQLStatementFactory sqlFactory = new BasicSQLStatementFactory();
            
            JDBCRatingDAO dao = new JDBCRatingDAO(conn, sqlFactory);
            LenskitConfiguration config = new LenskitConfiguration();
            config.addComponent(dao);
            /* additional configuration */
            LenskitRecommender rec = LenskitRecommender.build(config);
            // topRec = rec.getItemRecommender();
            /* do things with the recommender */
        } finally {
            ConnectionManager.close(conn);
        }
        
    }
    
}
