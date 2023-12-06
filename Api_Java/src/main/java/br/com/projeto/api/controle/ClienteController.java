package br.com.projeto.api.controle;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.projeto.api.modelo.Cliente;
import br.com.projeto.api.repositorio.Repositorio;

@RestController
@CrossOrigin(origins = "*")
public class ClienteController {

    @Autowired
    private Repositorio acao;

    @PostMapping("/")
    public Cliente cadastrar(@RequestBody Cliente c) {
        return acao.save(c);
    }

    @GetMapping("/")
    public Iterable<Cliente> selecionar() {
        return acao.findAll();
    }

    @PutMapping("/")
    public Cliente editar(@RequestBody Cliente c) {
        return acao.save(c);
    }

    @DeleteMapping("/{codigo}")
    public void remover(@PathVariable long codigo) {
        acao.deleteById(codigo);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> init(@PathVariable(value = "id") Long id) {
        Optional<Cliente> clienteOptional = acao.findById(id);

        if (clienteOptional.isPresent()) {
            Cliente cliente = clienteOptional.get();
            return new ResponseEntity<>(cliente, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/filtro/todos", produces = "application/json")
    public ResponseEntity<List<Cliente>> getAllWithFilter(@RequestParam(name = "titulo", required = false) String titulo) {
        List<Cliente> list;
            
        if (titulo == null || titulo.trim().isEmpty() || titulo.equalsIgnoreCase("undefined")) {
            list = acao.findAll();

            System.out.println(list);
        } else {
            list = acao.findByNomeContainingIgnoreCase(titulo);
        }
    
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    
}
