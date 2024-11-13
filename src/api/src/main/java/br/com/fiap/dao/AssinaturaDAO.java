package br.com.fiap.dao;

import br.com.fiap.model.Assinatura;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class AssinaturaDAO {

    // Inserir uma nova assinatura no banco de dados
    public void inserir(Assinatura assinatura) throws SQLException {
        String sql = "INSERT INTO assinaturas (usuario_id, telefone, tipo_residencia, bairro, tipo_plano, opcao_manutencao) VALUES (?, ?, ?, ?, ?, ?)";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, assinatura.getUsuarioId());
            stmt.setString(2, assinatura.getTelefone());
            stmt.setString(3, assinatura.getTipoResidencia());
            stmt.setString(4, assinatura.getBairro());
            stmt.setString(5, assinatura.getTipoPlano());
            stmt.setString(6, assinatura.getOpcaoManutencao());
            stmt.executeUpdate();
        }
    }

    // Atualizar uma assinatura
    public void atualizar(Assinatura assinatura) throws SQLException {
        String sql = "UPDATE assinaturas SET telefone = ?, tipo_residencia = ?, bairro = ?, tipo_plano = ?, opcao_manutencao = ? WHERE id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, assinatura.getTelefone());
            stmt.setString(2, assinatura.getTipoResidencia());
            stmt.setString(3, assinatura.getBairro());
            stmt.setString(4, assinatura.getTipoPlano());
            stmt.setString(5, assinatura.getOpcaoManutencao());
            stmt.setInt(6, assinatura.getId());
            stmt.executeUpdate();
        }
    }

    // Deletar uma assinatura pelo ID
    public void deletar(int id) throws SQLException {
        String sql = "DELETE FROM assinaturas WHERE id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.executeUpdate();
        }
    }

    // Buscar uma assinatura pelo ID
    public Assinatura buscarPorId(int id) throws SQLException {
        String sql = "SELECT * FROM assinaturas WHERE id = ?";
        Assinatura assinatura = null;

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    assinatura = new Assinatura();
                    assinatura.setId(rs.getInt("id"));
                    assinatura.setUsuarioId(rs.getInt("usuario_id"));
                    assinatura.setTelefone(rs.getString("telefone"));
                    assinatura.setTipoResidencia(rs.getString("tipo_residencia"));
                    assinatura.setBairro(rs.getString("bairro"));
                    assinatura.setTipoPlano(rs.getString("tipo_plano"));
                    assinatura.setOpcaoManutencao(rs.getString("opcao_manutencao"));
                }
            }
        }
        return assinatura;
    }

    // Listar todas as assinaturas
    public List<Assinatura> listarTodas() throws SQLException {
        String sql = "SELECT * FROM assinaturas";
        List<Assinatura> assinaturas = new ArrayList<>();

        try (Connection conn = DatabaseConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                Assinatura assinatura = new Assinatura();
                assinatura.setId(rs.getInt("id"));
                assinatura.setUsuarioId(rs.getInt("usuario_id"));
                assinatura.setTelefone(rs.getString("telefone"));
                assinatura.setTipoResidencia(rs.getString("tipo_residencia"));
                assinatura.setBairro(rs.getString("bairro"));
                assinatura.setTipoPlano(rs.getString("tipo_plano"));
                assinatura.setOpcaoManutencao(rs.getString("opcao_manutencao"));
                assinaturas.add(assinatura);
            }
        }
        return assinaturas;
    }
}
