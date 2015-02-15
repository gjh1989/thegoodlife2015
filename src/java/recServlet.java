/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.sql.ResultSet;
import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.mahout.cf.taste.common.TasteException;
import org.apache.mahout.cf.taste.impl.model.jdbc.MySQLJDBCDataModel;
import org.apache.mahout.cf.taste.impl.recommender.GenericItemBasedRecommender;
import org.apache.mahout.cf.taste.impl.similarity.LogLikelihoodSimilarity;
import org.apache.mahout.cf.taste.recommender.ItemBasedRecommender;
import org.apache.mahout.cf.taste.recommender.RecommendedItem;
import org.apache.mahout.cf.taste.similarity.ItemSimilarity;

public class recServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     * @throws org.apache.mahout.cf.taste.common.TasteException
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, TasteException {
        response.setContentType("text/html;charset=UTF-8");

        //specifying the number of recommendations to be generated
        int noOfRecommendations = 5;

        // Specifications tables  
        String tablename = "deals_rating";
        String col1 = "userid";
        String col2 = "dealid";
        String col3 = "rating";

        //Input for database connections
        String servername = "localhost";
        String username = "root";
        String password = "";
        String dbname = "thegoodlife";

        //setup for second connection
        java.sql.Connection conn = null;
        java.sql.Statement stmt = null;
        ResultSet rs = null;
        PrintWriter out = response.getWriter();
        //PrintWriter outt = new PrintWriter(new FileWriter("C:/Users/JunHong/Desktop/ml-100k/output.csv"));
        try {
            ///Initialize connection for Mahout input
            MysqlDataSource dataSource = new MysqlDataSource();
            dataSource.setServerName(servername);
            dataSource.setUser(username);
            dataSource.setPassword(password);
            dataSource.setDatabaseName(dbname);
            MySQLJDBCDataModel dataModel = new MySQLJDBCDataModel(dataSource, tablename, col1, col2, col3, null);

            /*Specifies the Similarity algorithm*/
            ItemSimilarity itemSimilarity = new LogLikelihoodSimilarity(dataModel);

            /*Initalizing the recommender */
            ItemBasedRecommender recommender = new GenericItemBasedRecommender(dataModel, itemSimilarity);

            List<RecommendedItem> recommendations = recommender.recommend(303, noOfRecommendations);

            //  write output to file
            for (RecommendedItem recommendedItem : recommendations) {
                out.println("303" + "," + recommendedItem.getItemID() + "," + recommendedItem.getValue());
                out.println();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
            try {
                if (stmt != null) {
                    stmt.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
            try {
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        //close writer
//        outt.close();

//        PrintWriter out = response.getWriter();
//        DataModel model = new FileDataModel(new File("C:/Users/JunHong/Desktop/ml-100k/test.csv"));
//        UserSimilarity similarity = new PearsonCorrelationSimilarity(model);
//        UserNeighborhood neighborhood = new NearestNUserNeighborhood(2, similarity, model);
//        Recommender recommender = new GenericUserBasedRecommender(model, neighborhood, similarity);
//
//        List<RecommendedItem> recommendations = recommender.recommend(1, 1);
//        try {
//            for (RecommendedItem recommendation : recommendations) {
//                out.println(" recommendation: " + recommendation);
//            }
//        } catch (RuntimeException e) {
//        }
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
        try {
            processRequest(request, response);
        } catch (TasteException ex) {
            Logger.getLogger(recServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
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
        try {
            processRequest(request, response);
        } catch (TasteException ex) {
            Logger.getLogger(recServlet.class.getName()).log(Level.SEVERE, null, ex);
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
