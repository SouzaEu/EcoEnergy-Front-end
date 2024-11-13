package br.com.fiap.bo;

import br.com.fiap.dao.UsuarioDAO;
import br.com.fiap.model.Usuario;
import br.com.fiap.exception.UsuarioNaoEncontradoException;

import java.sql.SQLException;

public class UsuarioBO {

    private UsuarioDAO usuarioDAO;

    public UsuarioBO() {
        this.usuarioDAO = new UsuarioDAO();
    }

    // Método para registrar um novo usuário com validações
    public void registrarUsuario(Usuario usuario) throws SQLException, IllegalArgumentException {
        if (usuario.getNomeCompleto() == null || usuario.getNomeCompleto().isEmpty()) {
            throw new IllegalArgumentException("O nome completo é obrigatório.");
        }
        if (usuario.getEmail() == null || usuario.getEmail().isEmpty()) {
            throw new IllegalArgumentException("O email é obrigatório.");
        }
        if (usuario.getSenha() == null || usuario.getSenha().length() < 6) {
            throw new IllegalArgumentException("A senha deve ter no mínimo 6 caracteres.");
        }

        // Verifica se o email já está em uso
        Usuario usuarioExistente = usuarioDAO.buscarPorEmail(usuario.getEmail());
        if (usuarioExistente != null) {
            throw new IllegalArgumentException("O email já está em uso.");
        }

        usuarioDAO.inserir(usuario);
    }

    // Método para realizar o login
    public Usuario autenticarUsuario(String email, String senha) throws SQLException, UsuarioNaoEncontradoException {
        if (email == null || email.isEmpty() || senha == null || senha.isEmpty()) {
            throw new IllegalArgumentException("Email e senha são obrigatórios.");
        }

        Usuario usuario = usuarioDAO.buscarPorEmail(email);
        if (usuario == null || !usuario.getSenha().equals(senha)) {
            throw new UsuarioNaoEncontradoException("Email ou senha incorretos.");
        }

        return usuario;
    }

    // Método para atualizar informações de usuário
    public void atualizarUsuario(Usuario usuario) throws SQLException, IllegalArgumentException {
        if (usuario.getId() <= 0) {
            throw new IllegalArgumentException("ID de usuário inválido.");
        }

        usuarioDAO.atualizar(usuario);
    }

    // Método para deletar um usuário pelo ID
    public void deletarUsuario(int id) throws SQLException {
        if (id <= 0) {
            throw new IllegalArgumentException("ID de usuário inválido.");
        }

        usuarioDAO.deletar(id);
    }

    // Método para buscar um usuário pelo ID
    public Usuario buscarPorId(int id) throws SQLException, UsuarioNaoEncontradoException {
        Usuario usuario = usuarioDAO.buscarPorId(id);
        if (usuario == null) {
            throw new UsuarioNaoEncontradoException("Usuário não encontrado.");
        }
        return usuario;
    }

}
