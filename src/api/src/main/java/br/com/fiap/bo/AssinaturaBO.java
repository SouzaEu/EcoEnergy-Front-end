package br.com.fiap.bo;

import br.com.fiap.dao.AssinaturaDAO;
import br.com.fiap.model.Assinatura;

import java.sql.SQLException;
import java.util.List;

public class AssinaturaBO {

    private AssinaturaDAO assinaturaDAO;

    public AssinaturaBO() {
        this.assinaturaDAO = new AssinaturaDAO();
    }

    // Método para criar uma nova assinatura com validações
    public void criarAssinatura(Assinatura assinatura) throws SQLException, IllegalArgumentException {
        if (assinatura.getUsuarioId() <= 0) {
            throw new IllegalArgumentException("ID de usuário é obrigatório.");
        }
        if (assinatura.getTelefone() == null || assinatura.getTelefone().isEmpty()) {
            throw new IllegalArgumentException("O telefone é obrigatório.");
        }
        if (assinatura.getTipoPlano() == null || assinatura.getTipoPlano().isEmpty()) {
            throw new IllegalArgumentException("O tipo de plano é obrigatório.");
        }

        assinaturaDAO.inserir(assinatura);
    }

    // Método para atualizar uma assinatura existente
    public void atualizarAssinatura(Assinatura assinatura) throws SQLException, IllegalArgumentException {
        if (assinatura.getId() <= 0) {
            throw new IllegalArgumentException("ID de assinatura inválido.");
        }

        assinaturaDAO.atualizar(assinatura);
    }

    // Método para deletar uma assinatura pelo ID
    public void deletarAssinatura(int id) throws SQLException, IllegalArgumentException {
        if (id <= 0) {
            throw new IllegalArgumentException("ID de assinatura inválido.");
        }

        assinaturaDAO.deletar(id);
    }

    // Método para buscar assinatura pelo ID do usuário
    public Assinatura buscarAssinaturaPorUsuarioId(int usuarioId) throws SQLException {
        return assinaturaDAO.buscarPorId(usuarioId);
    }

    // Método para listar todas as assinaturas (opcional, dependendo do contexto)
    public List<Assinatura> listarAssinaturas() throws SQLException {
        return assinaturaDAO.listarTodas();
    }
}
