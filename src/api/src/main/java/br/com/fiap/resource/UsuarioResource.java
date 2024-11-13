package br.com.fiap.resource;

import br.com.fiap.bo.UsuarioBO;
import br.com.fiap.exception.UsuarioNaoEncontradoException;
import br.com.fiap.model.Usuario;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.sql.SQLException;

@Path("/usuarios")
public class UsuarioResource {

    private UsuarioBO usuarioBO = new UsuarioBO();

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response cadastrarUsuario(Usuario usuario) {
        try {
            usuarioBO.registrarUsuario(usuario);
            return Response.status(Response.Status.CREATED).entity(usuario).build();
        } catch (SQLException | IllegalArgumentException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }
    }

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response autenticarUsuario(@QueryParam("email") String email, @QueryParam("senha") String senha) {
        try {
            Usuario usuario = usuarioBO.autenticarUsuario(email, senha);
            return Response.ok(usuario).build();
        } catch (SQLException | UsuarioNaoEncontradoException e) {
            return Response.status(Response.Status.UNAUTHORIZED).entity(e.getMessage()).build();
        }
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response buscarUsuario(@PathParam("id") int id) {
        try {
            Usuario usuario = usuarioBO.buscarPorId(id);
            if (usuario == null) {
                throw new UsuarioNaoEncontradoException("Usuário não encontrado.");
            }
            return Response.ok(usuario).build();
        } catch (SQLException | UsuarioNaoEncontradoException e) {
            return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
        }
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response atualizarUsuario(@PathParam("id") int id, Usuario usuario) {
        try {
            usuario.setId(id);
            usuarioBO.atualizarUsuario(usuario);
            return Response.ok().build();
        } catch (SQLException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }
    }

    @DELETE
    @Path("/{id}")
    public Response deletarUsuario(@PathParam("id") int id) {
        try {
            usuarioBO.deletarUsuario(id);
            return Response.noContent().build();
        } catch (SQLException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }
    }
}
