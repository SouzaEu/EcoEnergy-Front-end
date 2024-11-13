package br.com.fiap.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    private static Connection connection = null;

    // Configurando os parâmetros da autenticação
    static String driverJDBC = "oracle.jdbc.driver.OracleDriver"; // Nome do driver da Oracle
    static String server = "oracle.fiap.com.br"; // Endereço do Banco de dados (server)
    static String port = "1521"; // Porta TCP padrão da Oracle
    static String user = "RM556972"; // Usuário BD
    static String passwd = "180606"; // Senha BD
    static String sid = "ORCL"; // SID do Banco de Dados
    static String url = "jdbc:oracle:thin:@" + server + ":" + port + ":" + sid; // Cria a URL da conexão

    // Método para obter a conexão
    public static Connection getConnection() throws SQLException {
        if (connection == null || connection.isClosed()) {
            try {
                connection = DriverManager.getConnection(url, user, passwd);
            } catch (SQLException e) {
                throw new SQLException("Erro ao conectar ao banco de dados: " + e.getMessage(), e);
            }
        }
        return connection;
    }

    // Método para fechar a conexão
    public static void closeConnection() {
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException e) {
                System.err.println("Erro ao fechar a conexão: " + e.getMessage());
            } finally {
                connection = null; // Limpar referência
            }
        }
    }
}
