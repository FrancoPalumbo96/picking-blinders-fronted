package com.picking.blinders.app.services;

import com.picking.blinders.app.exceptions.ResourceNotFoundException;
import com.picking.blinders.app.models.Client;
import com.picking.blinders.app.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public Client createClient(Client client){
        return clientRepository.save(client);
    }

    public List<Client> findAll() {
        return (List<Client>) clientRepository.findAll();
    }

    public Client getClientById(Long clientId){
        return clientRepository.findById(clientId).orElseThrow(() -> new ResourceNotFoundException("Client not found."));
    }

}
