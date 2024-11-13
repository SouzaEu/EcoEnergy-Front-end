package br.com.fiap.resource;

import br.com.fiap.bo.AssinaturaBO;
import br.com.fiap.exception.AssinaturaNaoEncontradaException;
import br.com.fiap.model.Assinatura;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.sql.SQLException;

@Path("/assinaturas")
public class AssinaturaResource {

    private AssinaturaBO assinaturaBO = new AssinaturaBO();

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response criarAssinatura(Assinatura assinatura) {
        try {
            assinaturaBO.criarAssinatura(assinatura);
            return Response.status(Response.Status.CREATED).entity(assinatura).build();
        } catch (SQLException | IllegalArgumentException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response buscarAssinatura(@PathParam("id") int id) {
        try {
            Assinatura assinatura = assinaturaBO.buscarAssinaturaPorUsuarioId(id);
            if (assinatura == null) {
                throw new AssinaturaNaoEncontradaException("Assinatura não encontrada.");
            }
            return Response.ok(assinatura).build();
        } catch (SQLException | AssinaturaNaoEncontradaException e) {
            return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
        }
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response atualizarAssinatura(@PathParam("id") int id, Assinatura assinatura) {
        try {
            assinatura.setId(id);
            assinaturaBO.atualizarAssinatura(assinatura);
            return Response.ok().build();
        } catch (SQLException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }
    }

    @DELETE
    @Path("/{id}")
    public Response deletarAssinatura(@PathParam("id") int id) {
        try {
            assinaturaBO.deletarAssinatura(id);
            return Response.noContent().build();
        } catch (SQLException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }
    }
}
