package br.com.fiap.model;

public class Usuario {
    private int id;
    private String nomeCompleto;
    private String email;
    private String senha;

    // Construtor padrão
    public Usuario() {}

    // Construtor completo
    public Usuario(int id, String nomeCompleto, String email, String senha) {
        this.id = id;
        this.nomeCompleto = nomeCompleto;
        this.email = email;
        this.senha = senha;
    }

    // Getters e Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    // Método auxiliar: validação de e-mail
    public boolean isEmailValido() {
        return email != null && email.contains("@") && email.contains(".");
    }

    // Método auxiliar: verificação de força da senha
    public boolean isSenhaForte() {
        return senha != null && senha.length() >= 8; // Exemplo básico: 8 caracteres
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", nomeCompleto='" + nomeCompleto + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
