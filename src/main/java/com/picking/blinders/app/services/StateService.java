package com.picking.blinders.app.services;

import com.picking.blinders.app.exceptions.ResourceNotFoundException;
import com.picking.blinders.app.models.Order;
import com.picking.blinders.app.models.State;
import com.picking.blinders.app.repositories.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StateService {
    @Autowired
    private StateRepository stateRepository;

    public State createEstado(State state){
        return stateRepository.save(state);
    }

    public List<State> findAll() {
        return (List<State>) stateRepository.findAll();
    }

    public State getEstadoById(Long estadoId){
        return stateRepository.findById(estadoId).orElseThrow(() -> new ResourceNotFoundException("Estado not found."));
    }

    public List<State> findByName(String name) { return stateRepository.findByName(name);}
}
