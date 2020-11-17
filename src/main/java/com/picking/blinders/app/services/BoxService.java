package com.picking.blinders.app.services;


import com.picking.blinders.app.exceptions.ResourceNotFoundException;
import com.picking.blinders.app.models.*;
import com.picking.blinders.app.repositories.BoxRepository;
import com.picking.blinders.app.repositories.LabelRepository;
import com.picking.blinders.app.repositories.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BoxService {

    @Autowired
    private BoxRepository boxRepository;
    @Autowired
    private StateRepository stateRepository;
    @Autowired
    private LabelRepository labelRepository;

    public Box createBox(Box box){
        return boxRepository.save(box);
    }

    public List<Box> findAll() {
        return (List<Box>) boxRepository.findAll();
    }

    public Box getBoxById(Long boxId){
        Optional<Box> box = boxRepository.findById(boxId);
        if(box.isPresent()){
            return box.get();
        } else {
            return null;
        }
    }

    public void changeBoxStateToMissing(Long boxId) {
        Box box = boxRepository.findById(boxId).orElseThrow(() -> new ResourceNotFoundException("Label not found."));
        State state = stateRepository.findByName("Faltante");
        box.setState(state);
        boxRepository.save(box);
    }

    public void changeBoxStateToFlawed(Long boxId) {
        Box box = boxRepository.findById(boxId).orElseThrow(() -> new ResourceNotFoundException("Label not found."));
        State state = stateRepository.findByName("Fallo");
        box.setState(state);
        boxRepository.save(box);
    }

    public void changeBoxStateToFinished(Long boxId) {
        Box box = boxRepository.findById(boxId).orElseThrow(() -> new ResourceNotFoundException("Label not found."));
        State state = stateRepository.findByName("Finalizado");
        box.setState(state);
        boxRepository.save(box);
    }

    public void changeBoxStateToInProgress(Long boxId) {
        Box box = boxRepository.findById(boxId).orElseThrow(() -> new ResourceNotFoundException("Label not found."));
        State state = stateRepository.findByName("En curso");
        box.setState(state);
        boxRepository.save(box);
    }

    public List<Box> getAllBoxesPrintedByZone(String zone) {
        List<Label> labels = labelRepository.findByPrintedTrueAndBoxOrderZone(zone);
        List<Box> boxes = new ArrayList<>();
        for (Label l:labels) {
            boxes.add(l.getBox());
        }
        return boxes;
    }

    public List<Box> getAllBoxesPrintedByZoneWithStateFailed(String zone) {
        State state = stateRepository.findByName("Fallo");
        List<Label> labels = labelRepository.findByPrintedTrueAndBoxOrderZoneAndBoxState(zone, state);
        List<Box> boxes = new ArrayList<>();
        for (Label l:labels) {
            boxes.add(l.getBox());
        }
        return boxes;
    }

    public void resetBox(Long boxId) {
        Box box = boxRepository.findById(boxId).orElseThrow(() -> new ResourceNotFoundException("Label not found."));
        for (PickingList pl : box.getPickingLists()) {
            for (PickingListProductQuantity plpq : pl.getPickingListProductQuantities()) {
                plpq.setMissingQuantity(plpq.getQuantity());
            }
        }
        boxRepository.save(box);
    }
}
