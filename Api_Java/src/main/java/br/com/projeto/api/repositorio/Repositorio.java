package br.com.projeto.api.repositorio;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.projeto.api.modelo.Cliente;

public interface Repositorio extends JpaRepository<Cliente, Long> {

    Optional<Cliente> findById(Long id);

    @Query("SELECT c FROM Cliente c WHERE LOWER(c.titulo) LIKE LOWER(CONCAT('%', :titulo, '%'))")
    List<Cliente> findByNomeContainingIgnoreCase(String titulo); 
}