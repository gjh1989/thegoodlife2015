package com.thegoodlife2015.servlet;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import java.sql.ResultSet;
import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;
import com.thegoodlife2015.model.ConnectionManager;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.List;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.mahout.cf.taste.common.TasteException;
import org.apache.mahout.cf.taste.impl.model.jdbc.MySQLJDBCDataModel;
import org.apache.mahout.cf.taste.impl.recommender.GenericBooleanPrefItemBasedRecommender;
import org.apache.mahout.cf.taste.impl.recommender.GenericItemBasedRecommender;
import org.apache.mahout.cf.taste.impl.recommender.RandomRecommender;
import org.apache.mahout.cf.taste.impl.similarity.LogLikelihoodSimilarity;
import org.apache.mahout.cf.taste.recommender.ItemBasedRecommender;
import org.apache.mahout.cf.taste.recommender.RecommendedItem;
import org.apache.mahout.cf.taste.similarity.ItemSimilarity;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

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
        PrintWriter out = response.getWriter();

        //specifying the number of recommendations to be generated
        int noOfRecommendations = 20;

        String fbID = request.getParameter("fbID");
        long fbIDL = Long.parseLong(fbID);

        // Specifications tables  
        String tablename = "rating";
        String col1 = "fbID";
        String col2 = "offerID";
        String col3 = "rate";

        //Input for database connections
        // grab environment variable
        String host = System.getenv("OPENSHIFT_MYSQL_DB_HOST");
        String servername;
        String username;
        String password;
        String dbname;
        String port;
        String PROPS_FILENAME = "/connection.properties";

        if (host != null) {
            // this is production environment
            // obtain database connection properties from environment variables
            servername = host;
            port = System.getenv("OPENSHIFT_MYSQL_DB_PORT");
            dbname = System.getenv("OPENSHIFT_APP_NAME");
            username = System.getenv("OPENSHIFT_MYSQL_DB_USERNAME");
            password = System.getenv("OPENSHIFT_MYSQL_DB_PASSWORD");
            //out.println(servername + " " + port + " " + dbname + " " + username + " " + password);

        } else {

            try {
                // Retrieve properties from connection.properties via the CLASSPATH
                // WEB-INF/classes is on the CLASSPATH
                InputStream is = ConnectionManager.class.getResourceAsStream(PROPS_FILENAME);
                Properties props = new Properties();
                props.load(is);

                // load database connection details
                servername = props.getProperty("db.host");
                port = props.getProperty("db.port");
                dbname = props.getProperty("db.name");
                username = props.getProperty("db.user");
                password = props.getProperty("db.password");

                //out.println(servername + " " + port + " " + dbname + " " + username + " " + password);
            } catch (Exception ex) {
                // unable to load properties file
                String message = "Unable to load '" + PROPS_FILENAME + "'.";

                out.println(message);
                Logger.getLogger(ConnectionManager.class.getName()).log(Level.SEVERE, message, ex);
                throw new RuntimeException(message, ex);
            }
        }

        //setup for second connection
        java.sql.Connection conn = null;
        java.sql.Statement stmt = null;
        ResultSet rs = null;
        boolean hasRec = false;

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
            List<RecommendedItem> recommendations = null;

            try {
                recommendations = recommender.recommend(fbIDL, noOfRecommendations);
            } catch (Exception e) {
                RandomRecommender rRecommender = new RandomRecommender(dataModel);
                recommendations = rRecommender.recommend(fbIDL, noOfRecommendations);
            } finally {
                if (recommendations.size() < noOfRecommendations) {
                    int randomInt = noOfRecommendations - recommendations.size();
                    RandomRecommender rRecommender = new RandomRecommender(dataModel);
                    recommendations.addAll(rRecommender.recommend(fbIDL, randomInt));
                }
            }
            if (recommendations.size() >= 0) {
                JSONObject jsonObject = getJsonFromMyFormObject(recommendations, fbIDL);
                hasRec = true;
                out.println(jsonObject);
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

//        if(!hasRec) {
//            out.println("{\"error\":\"user has no records\"}");
//        }
    }

    public static JSONObject getJsonFromMyFormObject(List<RecommendedItem> recommendations, long fbID) {
        JSONObject responseDetailsJson = new JSONObject();
        JSONArray jsonArray = new JSONArray();

        for (int i = 0; i < recommendations.size(); i++) {
            jsonArray.add(recommendations.get(i).getItemID());
        }
        responseDetailsJson.put("recommendations", jsonArray);
        return responseDetailsJson;
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
