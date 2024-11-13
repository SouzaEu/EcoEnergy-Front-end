package br.com.fiap.model;

public class Assinatura {
    private int id;
    private int usuarioId;
    private String telefone;
    private String tipoResidencia;
    private String bairro;
    private String tipoPlano;
    private String opcaoManutencao;

    // Construtor padrão
    public Assinatura() {}

    // Construtor completo
    public Assinatura(int id, int usuarioId, String telefone, String tipoResidencia,
                      String bairro, String tipoPlano, String opcaoManutencao) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.telefone = telefone;
        this.tipoResidencia = tipoResidencia;
        this.bairro = bairro;
        this.tipoPlano = tipoPlano;
        this.opcaoManutencao = opcaoManutencao;
    }

    // Getters e Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(int usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getTipoResidencia() {
        return tipoResidencia;
    }

    public void setTipoResidencia(String tipoResidencia) {
        this.tipoResidencia = tipoResidencia;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getTipoPlano() {
        return tipoPlano;
    }

    public void setTipoPlano(String tipoPlano) {
        this.tipoPlano = tipoPlano;
    }

    public String getOpcaoManutencao() {
        return opcaoManutencao;
    }

    public void setOpcaoManutencao(String opcaoManutencao) {
        this.opcaoManutencao = opcaoManutencao;
    }

    // Método auxiliar: calcular valor estimado do plano
    public double calcularValorPlano() {
        double valorBase = 100.0;

        switch (tipoPlano.toLowerCase()) {
            case "basico":
                valorBase += 50.0;
                break;
            case "padrao":
                valorBase += 100.0;
                break;
            case "premium":
                valorBase += 150.0;
                break;
        }

        switch (opcaoManutencao.toLowerCase()) {
            case "sem manutenção":
                break;
            case "manutenção basica":
                valorBase += 50.0;
                break;
            case "manutenção premium":
                valorBase += 100.0;
                break;
        }

        return valorBase;
    }

    @Override
    public String toString() {
        return "Assinatura{" +
                "id=" + id +
                ", usuarioId=" + usuarioId +
                ", telefone='" + telefone + '\'' +
                ", tipoResidencia='" + tipoResidencia + '\'' +
                ", bairro='" + bairro + '\'' +
                ", tipoPlano='" + tipoPlano + '\'' +
                ", opcaoManutencao='" + opcaoManutencao + '\'' +
                ", valorPlano=" + calcularValorPlano() +
                '}';
    }
}
